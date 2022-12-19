// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";
import "hardhat/console.sol";

error FundMe__NotOwner();
error FundMe__NeedMoreETH();
error FundMe__CallFailed();

/**
 * @title A contract for crowdfunding
 * @author Sina Rezaei
 * @notice This contract is only a demo
 * @dev This implements as our library
 */
contract FundMe {
  using PriceConverter for uint256;

  mapping(address => uint256) private s_addressToAmountFunded;
  address[] private s_funders;
  address private immutable i_owner;
  uint256 public constant MINIMUM_USD = 50 * 10 ** 18;
  AggregatorV3Interface private immutable s_priceFeed;

  modifier onlyOwner() {
    // require(msg.sender == owner);
    if (msg.sender != i_owner) revert FundMe__NotOwner();
    _;
  }

  constructor(address priceFeedAddress) {
    i_owner = msg.sender;
    s_priceFeed = AggregatorV3Interface(priceFeedAddress);
  }

  receive() external payable {
    fund();
  }

  fallback() external payable {
    fund();
  }

  function fund() public payable {
    // console.log("funding contract with %s ETH", msg.value);
    // require(
    //   msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
    //   "You need to spend more ETH!"
    // );
    if (msg.value.getConversionRate(s_priceFeed) < MINIMUM_USD) {
      revert FundMe__NeedMoreETH();
    }
    // require(PriceConverter.getConversionRate(msg.value) >= MINIMUM_USD, "You need to spend more ETH!");
    s_addressToAmountFunded[msg.sender] += msg.value;
    s_funders.push(msg.sender);
  }

  function withdraw() public onlyOwner {
    for (
      uint256 funderIndex = 0;
      funderIndex < s_funders.length;
      funderIndex++
    ) {
      address funder = s_funders[funderIndex];
      s_addressToAmountFunded[funder] = 0;
    }
    s_funders = new address[](0);
    // // transfer
    // payable(msg.sender).transfer(address(this).balance);
    // // send
    // bool sendSuccess = payable(msg.sender).send(address(this).balance);
    // require(sendSuccess, "Send failed");
    // call
    (bool callSuccess, ) = payable(msg.sender).call{
      value: address(this).balance
    }("");
    // require(callSuccess, "Call failed");
    if (!callSuccess) {
      revert FundMe__CallFailed();
    }
  }

  function cheaperWithdraw() public onlyOwner {
    address[] memory funders = s_funders;
    for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) {
      address funder = funders[funderIndex];
      s_addressToAmountFunded[funder] = 0;
    }
    s_funders = new address[](0);
    (bool callSuccess, ) = i_owner.call{value: address(this).balance}("");
    // require(callSuccess, "Call failed");
    if (!callSuccess) {
      revert FundMe__CallFailed();
    }
  }

  function getOwner() public view returns (address) {
    return i_owner;
  }

  function getFunder(uint256 index) public view returns (address) {
    return s_funders[index];
  }

  function getAddressToAmountFunded(
    address funder
  ) public view returns (uint256) {
    return s_addressToAmountFunded[funder];
  }

  function getPriceFeed() public view returns (AggregatorV3Interface) {
    return s_priceFeed;
  }
}
