// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
pragma abicoder v2;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";

interface Iverification {
       function checkVerificationStatus(address _addr) external view returns(bool);
}
interface IWMATIC {
    function deposit() external payable;
}

contract BITKOPA_MATIC is ReentrancyGuard{

    // interfaces
    //Bitkopa Verification
    Iverification VerificationInterface;

    //WMATIC
    IWMATIC WMATICInterface; //required to wrap MATIC to WMATIC for ERC20 compactibility

    //Uniswap Router - Required to liquidate collateral
    // Collateral is swapped to USDC on Uniswap V3
    ISwapRouter public immutable swapRouter;

    address  constant WMATIC = 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270; //mainnet for WMATIC
    address  STABLECOIN = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174; //mainnet for USDC

    // set the pool fee to 0.05%. => 500/10,000
    uint24   poolFee = 500;


    //MATIC/ USD PriceFeed
    AggregatorV3Interface internal PriceFeedInterface;

    //events
    event LoanRequest(address indexed borrower, address refBorrower, uint256 loanId, uint256 duration, uint256 collateralAmount);
    event CollateralTopUp(address indexed borrower, address refBorrower, uint256 loanId, uint256 topUpAmount);
    event LoanRepayment(address indexed borrower, Loan activeLoan);
    event LoanProcessed(address indexed borrower, Loan processedLoan);
    event CollateralRecovery(address indexed borrower, Loan liquidatedLoan);
    event DirectDepositRecovery(address indexed owner, uint256 amount);
    event WithdrawExcessCollateral(address indexed borrower,uint256 amount, Loan targetLoan);
    event CollateralLiquidation(address indexed borrower, uint256 amountOut, Loan liquidatedLoan);

    //storage
    address private s_owner;
    uint256 public s_minCollateral; // minimum allowed collateral
    uint256 public s_maxLTV; // maximum loan amount you can receive
    uint256  s_priceDecimals = 8; //no. of decimals from price feed oracle
    uint256  s_FXDecimals = 8; //no. of decimals for the FX Rate
    uint256  s_interestRateDecimals = 8; //no. of decimals for the hourly interest rate
    uint256 public s_liquidationThreshold; // when LTV raises to this threshold, you get liquidated
    mapping(uint256 => LoanExtension) public s_loanDuration; //loan durations allowed (in days) e.g 7, 14, 30, their extension period and penalty
    uint256[] public s_loanIds; //to store loan ids
    uint256 public s_directDeposit; // holds MATIC that is sent directly to the contract. To allow recovery

    struct Loan{
       uint256 loanId;
       uint256 collateralAmount;
       uint256 loanAmount;
       uint256 paymentMethodId;
       uint256 duration;
       uint256 processedTimestamp;
       uint256 interestRate;
       uint256 FXRate;
       address borrower;
       LoanStatus status;
       uint256[] repayments;
    }
    struct LoanExtension{
        uint256 extendedDuration;
        uint256 interestRateMultiplier;
    }

    enum LoanStatus{
       Active,
       Completed,
       Liquidated,
       Requested
    }

    // to track loanIds beginning with 2540 - incremented before usage
    uint256 private s_loanId = 2539;

    //mapping for active loans
    mapping(uint256 => Loan) public s_Loans;

    constructor(address _verification, address _priceFeedContract, uint256 _maxLTV, uint256 _minCollateral, uint256 _liquidationThreshold, uint256[] memory _duration, uint256[] memory _extendedDuration, uint256[] memory _interestRateMultiplier,  ISwapRouter _swapRouter){
        VerificationInterface = Iverification(_verification);
        PriceFeedInterface = AggregatorV3Interface(_priceFeedContract);
        WMATICInterface = IWMATIC(WMATIC);
        s_maxLTV = _maxLTV;
        s_minCollateral = _minCollateral;
        s_liquidationThreshold = _liquidationThreshold;
        swapRouter = _swapRouter;
        s_owner = msg.sender;
        require(_duration.length == _extendedDuration.length && _duration.length == _interestRateMultiplier.length, "Error in Loan Duration");
        for(uint8 i = 0; i< _duration.length; i++){
            s_loanDuration[_duration[i]] = LoanExtension({extendedDuration:_extendedDuration[i],interestRateMultiplier:_interestRateMultiplier[i]});
        }


    }

    // called by borrower to request for loan
    function loanRequest( uint256 _loanAmount, uint256 _duration, uint256 _paymentMethodId) external  payable returns (uint256 _loanId){
        // check if msg.sender is whiteListed
        require(VerificationInterface.checkVerificationStatus(msg.sender), "Not Authorised To Use Bitkopa.com services");

        //check if collateralAmount >= minCollateral
        require( msg.value >= s_minCollateral, "Collateral Amount Is Below minimum");

        //LoanAmount will be validated by backend
        // If requested loan amount is 0, or > maxLTV, backend will disburse max LoanAmount depending on
        // collateralAmount otherwise requested loan amount will be disbursed

        //check if duration is supported  - 7days, 14 days, 30 days etc
        require(s_loanDuration[_duration].extendedDuration > 0, "Invalid Loan Duration");

        //create new loan
        Loan memory newLoanRequest = Loan({loanId: ++s_loanId,
        collateralAmount: msg.value,
        loanAmount: _loanAmount,
        paymentMethodId:_paymentMethodId,
        duration: _duration,
        processedTimestamp: 0,
        interestRate: 0,
        FXRate:0,
        borrower: msg.sender,
        status: LoanStatus.Requested,
        repayments: new uint256[](0)});

        //make sure loanId hasnt been used yet
        //to avoid overwritting an existing loan request
        //the default collateralAmount is 0 for unused loanId
        require(s_Loans[newLoanRequest.loanId].collateralAmount == 0, "Loan Request Failed, Try Again Please");

        //map loan request with loanId
        s_Loans[newLoanRequest.loanId] = newLoanRequest;

        //add loanId to loanIds
        s_loanIds.push(newLoanRequest.loanId);
        // emit event
        emit LoanRequest(msg.sender, msg.sender, newLoanRequest.loanId, _duration, msg.value);

        return newLoanRequest.loanId;
    }

    //called by owner to process loan request
    // means that FIAT has been sent to the user
    function processLoanRequest(uint256 _loanId, uint256 _loanAmount, uint256 _interestRate, uint256 _FXRate) external onlyOwner {

       //for non-existing loan request, collateralAmount = 0
       require(s_Loans[_loanId].collateralAmount >= s_minCollateral, "Invalid Loan ID");

       //assert the loan status is currently requested
       require(s_Loans[_loanId].status == LoanStatus.Requested, "Invalid Loan Status");

       //retrieve the loanRequest
        Loan memory pendingLoan = s_Loans[_loanId];

        pendingLoan.interestRate = _interestRate;
        pendingLoan.FXRate = _FXRate;
        pendingLoan.loanAmount = _loanAmount;
        pendingLoan.processedTimestamp = block.timestamp;
        pendingLoan.status = LoanStatus.Active;

        //update in storage
        s_Loans[_loanId] = pendingLoan;
        //emit event
        emit LoanProcessed(pendingLoan.borrower, pendingLoan);
    }

    // called by admin to reduce the loanAmount
    function Repayment(uint256 _loanId, uint256 _payment) external payable onlyOwner{
        //assert loan is active
        require(s_Loans[_loanId].status == LoanStatus.Active, "Invalid Loan Id");

        //No need for safe math - solidity 0.8+ handles overflows
        //push payment into repayments
        s_Loans[_loanId].repayments.push(_payment);

        uint256 loanBalance = getLoanBalance(s_Loans[_loanId]);

        //check if fully repaid
        if(loanBalance == 0){
            s_Loans[_loanId].status = LoanStatus.Completed;
            //send collateral back to borrower
            payable(s_Loans[_loanId].borrower).transfer(s_Loans[_loanId].collateralAmount);
        }
        //event
        emit LoanRepayment(s_Loans[_loanId].borrower, s_Loans[_loanId]);

    }

    // called by borrower to increase collateralAmount
    function topUpCollateral(uint256 _loanId) external payable {
        //assert msg.sender is the borrower
        require(s_Loans[_loanId].borrower == msg.sender, "Invalid Loan Id");

        //assert loan is still active -not completed/liquidated
        require(s_Loans[_loanId].status == LoanStatus.Active, "Loan Not Active, Already Completed or liquidated");

        //assert msg.value > 0
        require(msg.value > 0, "Invalid Amount");
        //Increment collateralAmount for the loan
        s_Loans[_loanId].collateralAmount += msg.value;

        //emit event
        emit CollateralTopUp(msg.sender, msg.sender, _loanId, msg.value);
    }


    //In the event a borrower tops up a liquidated loan during the liquidation block
    function recoverCollateral(uint256 _loanId) external payable {
        Loan memory liquidatedLoan = s_Loans[_loanId];
        //for non-existing loan collateralAmount = 0
        require(liquidatedLoan.collateralAmount > 0, "Invalid Loan ID");
        //assert loan is liquidated
        require(liquidatedLoan.status == LoanStatus.Liquidated, "Loan Not liquidated");

        //set collateralAmount to 0
        s_Loans[_loanId].collateralAmount = 0;

        // send the collateral to user
        payable(liquidatedLoan.borrower).transfer(liquidatedLoan.collateralAmount);

        //emit event
        emit CollateralRecovery(liquidatedLoan.borrower, liquidatedLoan);
    }

     //allow owner to withdraw funds sent directly to the smart contract
    function recoverDirectDeposit() external  payable onlyOwner{
        require(s_directDeposit > 0, "No Direct Deposits");
        uint256 amount = s_directDeposit;
        s_directDeposit = 0; // reset to zero to avoid multiple withdrawals
        payable(s_owner).transfer(amount);

        //emit event
        emit DirectDepositRecovery(s_owner, amount);
    }


    // called by borrower to reduce collateral amount
    // collateral remaining cannot be < maxLTV
    // can only withdraw from an ongoing loan
    //reentrancy guard needed
    function withdrawExcessCollateral(uint256 _loanId, uint256 _withdrawAmount) external payable nonReentrant{
        Loan memory targetLoan = s_Loans[_loanId];
        //assert msg.sender is borrower
        require(targetLoan.borrower == msg.sender, "Invalid Loan Id");

        //assert loan is still active -not completed/liquidated
        require(targetLoan.status == LoanStatus.Active, "Loan Not Active, Already Completed or liquidated");

        uint256 collateralInLocalFiat = uint256((getCurrentprice() * targetLoan.collateralAmount * targetLoan.FXRate) / (10**s_priceDecimals*10**s_FXDecimals*1e18));
        uint256 requiredCollateralLocalFiat = uint256(targetLoan.loanAmount * 100/s_maxLTV);
        uint256 excessCollateralLocalFiat = uint256(collateralInLocalFiat - requiredCollateralLocalFiat);
        uint256 excessCollateralCrypto = (excessCollateralLocalFiat * 1e18 * 10**s_priceDecimals * 10**s_FXDecimals) / (getCurrentprice() * targetLoan.FXRate);
        uint amount = 0;

        // check if withdrawAmount < excessCollateralCrypto
        if (_withdrawAmount < excessCollateralCrypto){
              amount = _withdrawAmount;
        }
        else{
            amount = excessCollateralCrypto;
        }
        //update collateralAmount first
        s_Loans[_loanId].collateralAmount -= amount;

        //send requested amount to borrower
        //assert amount > 0
        require(amount > 0, "Not Enough Excess Collateral");
        payable(msg.sender).transfer(amount);

        //emit event
        emit WithdrawExcessCollateral(msg.sender, amount, targetLoan);
    }

    // called by chainlink keepers
    // checks for pending loans in the risk of liquidation
    // uses chainlink data feeds for checking collateral price
    // returns loanId for loan to liquidate
    // can be optimized to return array of loan Ids if need be
    function checkUpkeep(bytes calldata /* checkData */ ) external view  returns (bool upkeepNeeded, bytes memory performData) {
        //upkeepNeeded when there is a loan to liquidate
        uint256[] memory loanIds = s_loanIds;
        uint256  length = loanIds.length;
        for(uint i = 1; i < length +1; i++){
            //accessing active loans from end of array
            if(s_Loans[loanIds[length - i]].status == LoanStatus.Active){
            //check loan expiry or liquidation threshold
                if(checkLoanExpiry(s_Loans[loanIds[length - i]]) ||checkLiquidationThreshold(s_Loans[loanIds[length - i]]) ){
                    performData = abi.encode(s_Loans[loanIds[length - i]].loanId);
                    upkeepNeeded = true;
                    return(upkeepNeeded, performData);
                }
            }
        }

}

    // checks for loans to liquidate
    // liquidate through uniswap in mainnet
    // for testnet, send collateral to admin
    // for manual liquidation
    // all the USDC is sent to admin
    // update loan to liquidated
    function performUpkeep(bytes calldata performData ) external payable {
        //decode performData
        uint256 loanId = abi.decode(performData, (uint256));
        //retrieve the loan
        Loan memory targetLoan = s_Loans[loanId];
        //check if loan is active
        require(targetLoan.status == LoanStatus.Active, "Loan Not Active");
        //check if loan expired
        if(checkLoanExpiry(targetLoan) || checkLiquidationThreshold(targetLoan)){
              uint256 amount = targetLoan.collateralAmount;
              //subtract amount from collateral
              s_Loans[loanId].collateralAmount -= amount;
              //change status to liquidated
              s_Loans[loanId].status = LoanStatus.Liquidated;

              // on mainnet - Liquidation through Uniswap V3
              //uint256 amountOut = liquidateCollateral(amount, getCurrentprice());
              //emit event
              //emit CollateralLiquidation(targetLoan.borrower, amountOut, targetLoan);

              //on testnet - send collateral to admin for manual liquidation
              payable(s_owner).transfer(amount);

               emit CollateralLiquidation(targetLoan.borrower, amount, targetLoan);
            }

    }

    //UTILITY functions

     // Function to receive Ether. msg.data must be empty
    receive() external payable{
        s_directDeposit += msg.value;
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {
         s_directDeposit += msg.value;
    }

    // gets the current price of MATIC from chainlink oracles in USD
    function getCurrentprice() internal view returns(uint256 _currentPrice){
        //get current price of collateral in usd
         (
            ,
            /*uint80 roundID*/ int256 currentPrice /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/,
            ,
            ,

        ) = PriceFeedInterface.latestRoundData();

        //get current Price in usd
        _currentPrice = uint256(currentPrice);
        return _currentPrice;

    }

    //returns the loan balance
    //if repayments > loanAmount, return 0
    function getLoanBalance(Loan memory _loan) internal view returns(uint256){
        uint8 i = 0;
        uint256 totalRepayments = 0;
        uint256 interest = calculateInterest(_loan);
        for(i; i < _loan.repayments.length; i++){
            totalRepayments += _loan.repayments[i];
        }
        if (totalRepayments > _loan.loanAmount + interest){
            return 0;
        }
        else{
            return _loan.loanAmount + interest - totalRepayments;
        }
    }

    //used to calculate the interest
    //returns loanAmount - repayments
    function reducingLoanBalance(Loan memory _loan) internal pure returns(uint256){
        uint8 i = 0;
        uint256 totalRepayments = 0;
        for(i; i < _loan.repayments.length; i++){
            totalRepayments += _loan.repayments[i];
        }
        if (totalRepayments > _loan.loanAmount ){
            return 0;
        }
        else{
            return _loan.loanAmount  - totalRepayments;
        }
    }

    //returns the interest accrued by a loan
    function calculateInterest(Loan memory _loan) internal view returns (uint256){
        uint256 duration = block.timestamp - _loan.processedTimestamp;
        if(uint256(duration/ 1 hours) < 1){
            duration = 1;
        }
        else{
            duration = uint256(duration/ 1 hours);
        }
        uint256 interest = uint256((reducingLoanBalance(_loan) * _loan.interestRate * duration) / (10**s_interestRateDecimals * 100));

        //interest rate is increased if loan duration is exceeded
        if (block.timestamp > (_loan.processedTimestamp + _loan.duration * 1 days)){
            return interest * s_loanDuration[_loan.duration].interestRateMultiplier;
        }
        else{
            return interest;
        }


    }

    // checks if a loan has exceeded the loan duration + extendedDuration
    function checkLoanExpiry(Loan memory _loan) internal view returns(bool){
        if(block.timestamp > (_loan.processedTimestamp + _loan.duration * 1 days) + (s_loanDuration[_loan.duration].extendedDuration * 1 days)){
            return true;
        }
        else{
            return false;
        }
    }

    // checks if loan Amount has exceeded the liquidation threshold
    // as value of collateral drops, LTV increases
    function checkLiquidationThreshold(Loan memory _loan) internal view returns(bool){

        uint256 collateralInLocalFiat = uint256((getCurrentprice() * _loan.collateralAmount * _loan.FXRate) / (10**s_priceDecimals*10**s_FXDecimals*1e18));
        if(getLoanBalance(_loan) >= uint256((s_liquidationThreshold*collateralInLocalFiat)/100)){

            return true;
        }
        else{
            return false;
        }
    }

    // wraps MATIC to WMATIC
    // swaps WMATIC for USDC on Uniswap V3
    function liquidateCollateral(uint256 _collateralAmount, uint256 _currentPrice) internal returns(uint256 amountOut) {
        // first wrap MATIC to WMATIC
        WMATICInterface.deposit{value:_collateralAmount};
        //second step approve SwapRouter to spend WMATIC
        TransferHelper.safeApprove(WMATIC, address(swapRouter), _collateralAmount);
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: WMATIC,
            tokenOut: STABLECOIN,
            fee: poolFee,
            recipient:s_owner,
            deadline:block.timestamp + 30 minutes,
            amountIn:_collateralAmount,
            amountOutMinimum:uint256((s_liquidationThreshold *_collateralAmount*_currentPrice) / (100 * 1e18 * 10**s_priceDecimals)), //atleast 80% at current prices
            sqrtPriceLimitX96: 0  //to ensure we swap the exact input amount
        });

        amountOut = swapRouter.exactInputSingle(params);


    }

    //GETTERS

    //returns balance of the contract
    function getBalance() public view returns (uint256){
        return address(this).balance;
    }

    //returns balance of funds sent directly to the contract
    function getDirectDepositBalance() public view returns (uint256){
        return s_directDeposit;
    }

    //returns a Loan
    function getLoan(uint256 _loanId) public view returns(Loan memory){
        return s_Loans[_loanId];
    }

    //returns the Loan balance for a particular loan
    function LoanBalance(uint256 _loanId) public view returns(uint256){
        return getLoanBalance(s_Loans[_loanId]);
    }

    //returns the interest owed by borrower
    function getLoanInterest(uint256 _loanId) public view returns(uint256){
        return calculateInterest(s_Loans[_loanId]);
    }
    //returns array of repayments
    function getLoanRepayments(uint256 _loanId) public view returns(uint256[] memory){
        return s_Loans[_loanId].repayments;
    }
    //returns all the loan Ids, will be useful in the frontend
    function getLoanIds() public view returns(uint256[] memory){
        return s_loanIds;
    }

    //Loan config function
    function loanConfig(uint256 _minCollateral, uint256 _maxLTV, uint256 _liquidationThreshold, uint256[] memory _duration, uint256[] memory _extendedDuration, uint256[] memory _interestRateMultiplier, uint256 _priceDecimals, uint256 _FXDecimals, uint256 _interestRateDecimals ) external onlyOwner{
        s_minCollateral = _minCollateral;
        s_maxLTV = _maxLTV;
        s_liquidationThreshold = _liquidationThreshold;
        s_priceDecimals = _priceDecimals;
        s_FXDecimals = _FXDecimals;
        s_interestRateDecimals = _interestRateDecimals;
        require(_duration.length == _extendedDuration.length && _duration.length == _interestRateMultiplier.length, "Error in Loan Duration");
        for(uint8 i = 0; i< _duration.length; i++){
            s_loanDuration[_duration[i]] = LoanExtension({extendedDuration:_extendedDuration[i],interestRateMultiplier:_interestRateMultiplier[i]});
        }

    }
    function uniswapConfig(uint24 _poolFee, address _stablecoin) external onlyOwner{
        poolFee = _poolFee;
        STABLECOIN = _stablecoin;
    }

    modifier onlyOwner(){
        require(msg.sender == s_owner);
        _;
    }

}
