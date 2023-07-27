// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

/**
 * @title CryptoStarter
 * @author Jamie Anderson
 * @notice This contract is used to create and run a crowdfunding campaign
 * @dev This contract uses the Forge framework to create a crowdfunding campaign
 */
contract CryptoStarter {
    /**
     * Errors
     */
    error CryptoStarter__DeadlineShouldBeAFutureDate();
    error CryptoStarter__MinimumDonationValueNotMet();
    error CryptoStarter__TransferFailed();
    error CryptoStarter__OwnerCantDonateToOwnCampaign();
    error CryptoStarter__MinimumTargetValueNotMet();

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
    uint256 private immutable i_minDonation;

    mapping(uint256 => Campaign) private s_campaigns;
    uint256 private s_numberOfCampaigns;

    constructor(uint256 _minDonation) {
        i_minDonation = _minDonation;
    }

    /**
     * Events
     */
    event CreatedCampaign(
        uint256 id, address owner, string title, string description, uint256 target, uint256 deadline, string image
    );
    event DonatedToCampaign(uint256 id, address donator, uint256 amount);

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
        if (_deadline < block.timestamp) {
            revert CryptoStarter__DeadlineShouldBeAFutureDate();
        }

        if (_target < i_minDonation) {
            revert CryptoStarter__MinimumTargetValueNotMet();
        }

        Campaign storage campaign = s_campaigns[s_numberOfCampaigns];

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        emit CreatedCampaign(s_numberOfCampaigns, _owner, _title, _description, _target, _deadline, _image);

        s_numberOfCampaigns++;

        return s_numberOfCampaigns - 1;
    }

    function donateToCampaign(uint256 _id) external payable {
        if (msg.value < i_minDonation) {
            revert CryptoStarter__MinimumDonationValueNotMet();
        }

        Campaign storage campaign = s_campaigns[_id];

        if (campaign.owner == msg.sender) {
            revert CryptoStarter__OwnerCantDonateToOwnCampaign();
        }

        uint256 amount = msg.value;

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        campaign.amountCollected += amount;
        emit DonatedToCampaign(_id, msg.sender, amount);

        (bool success,) = payable(campaign.owner).call{value: amount}("");
        if (!success) {
            revert CryptoStarter__TransferFailed();
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

    function getCampaign(uint256 _id) external view returns (Campaign memory) {
        return s_campaigns[_id];
    }

    function getNumberOfCampaigns() external view returns (uint256) {
        return s_numberOfCampaigns;
    }

    function getMinDonation() external view returns (uint256) {
        return i_minDonation;
    }
}
