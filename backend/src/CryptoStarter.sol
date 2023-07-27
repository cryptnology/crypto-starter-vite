// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

// Layout of Contract:
// version
// imports
// interfaces, libraries, contracts
// errors
// Type declarations
// State variables
// Events
// Modifiers
// Functions

// Layout of Functions:
// constructor
// receive function (if exists)
// fallback function (if exists)
// external
// public
// internal
// private
// internal & private view & pure functions
// external & public view & pure functions

contract CryptoStarter {
    /**
     * Type declarations
     */
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    /**
     * State variables
     */
    mapping(uint256 => Campaign) private s_campaigns;
    uint256 private s_numberOfCampaigns;

    /**
     * External functions
     */
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) external returns (uint256) {
        Campaign storage campaign = s_campaigns[s_numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        s_numberOfCampaigns++;

        return s_numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) external payable {
        uint256 amount = msg.value;

        Campaign storage campaign = s_campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    /**
     * External & public view & pure functions
     */
    function getDonators(uint256 _id) external view returns (address[] memory, uint256[] memory) {
        return (s_campaigns[_id].donators, s_campaigns[_id].donations);
    }

    function getCampaigns() external view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](s_numberOfCampaigns);

        for (uint256 i = 0; i < s_numberOfCampaigns; i++) {
            Campaign storage item = s_campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}
