// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.16;

contract GithubRewards {
    address payable public owner;
    string public repository;
    uint public availableFunds;
    mapping(uint => Bounty) public bounties;

    struct Bounty {
        bool isActive;
        bool isClaimable;
        uint reward;
        Currency currency;
        address solver;
    }

    enum Currency {
        ETH,
        USDC
    }

    event BountyCreated(uint issue, uint reward, Currency currency);
    event BountyClaimed(uint issue, uint reward, Currency currency, address solver);
    event BountyRemoved(uint issue);

    constructor(string memory _repository) payable {
        repository = _repository;
        owner = payable(msg.sender);
    }

    function createBounty(uint _issue, uint _reward, uint _currency) public {
        require(owner == msg.sender);
        require(_currency == 0 || _currency == 1, 'choose currency');
        //check if issue is valid
        // check if _reward is lower than available funds

        if (_currency == 0) {
        bounties[_issue].currency = Currency.ETH;
        } else if (_currency == 1) {
        bounties[_issue].currency = Currency.USDC;
        }

        bounties[_issue].reward = _reward;
        bounties[_issue].isActive = true;


        emit BountyCreated(_issue, _reward, bounties[_issue].currency);
    }

    function editBounty(uint _issue, uint _reward) public {
        require(owner == msg.sender);
        bounties[_issue].reward = _reward;
    }

    function removeBounty(uint _issue) public {
        require(owner == msg.sender);
        bounties[_issue].reward = 0;
        bounties[_issue].isActive = false;
        bounties[_issue].solver = address(0);
        bounties[_issue].isClaimable = false;

        emit BountyRemoved(_issue);
    }

    // This function will be called by Chainlink automation
    function releaseBounty(uint _issue, address _solver) public {
        bounties[_issue].isClaimable = true;
        bounties[_issue].solver = _solver;
    }

    function claimBounty(uint _issue) public {
        require(bounties[_issue].solver == msg.sender);
        // transfer ERC20 or ETH to solver

        emit BountyClaimed(_issue, bounties[_issue].reward, bounties[_issue].currency, msg.sender);
    }

    function depositERC20(uint _amount) public {
        // transfer amount of tokens from owner to contract
    }

    function depositETH() payable public {
        require(msg.sender == owner);
    }
}
