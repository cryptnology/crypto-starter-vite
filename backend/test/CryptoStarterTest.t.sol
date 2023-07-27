// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {DeployCryptoStarter} from "../script/DeployCryptoStarter.s.sol";
import {CryptoStarter} from "../src/CryptoStarter.sol";
import {Test, console} from "forge-std/Test.sol";
import {StdCheats} from "forge-std/StdCheats.sol";

contract CryptoStarterTest is StdCheats, Test {
    CryptoStarter cryptoStarter;

    uint256 public constant MIN_DONATION = 0.01 ether;
    address public CREATOR = makeAddr("creator");
    address public DONATOR = makeAddr("donator");
    uint256 public constant STARTING_USER_BALANCE = 10 ether;
    string public constant TITLE = "title";
    string public constant DESCRIPTION = "description";
    uint256 public constant TARGET = 1 ether;
    uint256 public constant DEADLINE = 1;
    string public constant IMAGE = "image";

    /**
     * Events
     */
    event CreatedCampaign(
        uint256 id, address owner, string title, string description, uint256 target, uint256 deadline, string image
    );
    event DonatedToCampaign(uint256 id, address donator, uint256 amount);

    /**
     * Modifiers
     */
    modifier createCampaign() {
        cryptoStarter.createCampaign(CREATOR, TITLE, DESCRIPTION, TARGET, DEADLINE, IMAGE);
        _;
    }

    function setUp() external {
        DeployCryptoStarter deployer = new DeployCryptoStarter();
        cryptoStarter = deployer.run();
        vm.deal(DONATOR, STARTING_USER_BALANCE); // Give donator some ETH
        vm.deal(CREATOR, STARTING_USER_BALANCE); // Give creator some ETH
    }

    function testCryptoStarterInitializesWithMinDonation() public {
        assertEq(cryptoStarter.getMinDonation(), MIN_DONATION);
    }

    /**
     * createCampaign()
     */
    function testCryptoStarterRevertWhenDeadlineIsNotAFutureDate() public {
        uint256 deadline = block.timestamp - 1;

        vm.expectRevert(CryptoStarter.CryptoStarter__DeadlineShouldBeAFutureDate.selector);
        cryptoStarter.createCampaign(CREATOR, TITLE, DESCRIPTION, TARGET, deadline, IMAGE);
    }

    function testCryptoStarterRevertWhenMinimumTargetValueNotMet() public {
        uint256 target = MIN_DONATION - 1;

        vm.expectRevert(CryptoStarter.CryptoStarter__MinimumTargetValueNotMet.selector);
        cryptoStarter.createCampaign(CREATOR, TITLE, DESCRIPTION, target, DEADLINE, IMAGE);
    }

    function testAddsCampaignToCampaignsMapping() public createCampaign {
        CryptoStarter.Campaign memory campaign = cryptoStarter.getCampaign(0);

        assertEq(campaign.owner, CREATOR);
        assertEq(campaign.title, TITLE);
        assertEq(campaign.description, DESCRIPTION);
        assertEq(campaign.target, TARGET);
        assertEq(campaign.deadline, DEADLINE);
        assertEq(campaign.amountCollected, 0);
        assertEq(campaign.image, IMAGE);
    }

    function testEmitsEventOnCreationOfACampaign() public {
        vm.expectEmit(true, false, false, false, address(cryptoStarter));
        emit CreatedCampaign(0, CREATOR, TITLE, DESCRIPTION, TARGET, DEADLINE, IMAGE);
        cryptoStarter.createCampaign(CREATOR, TITLE, DESCRIPTION, TARGET, DEADLINE, IMAGE);
    }

    function testIncrementsNumberOfCampaigns() public createCampaign {
        assertEq(cryptoStarter.getNumberOfCampaigns(), 1);
    }

    /**
     * donateToCampaign()
     */
    function testRevertWhenMinimumDonationValueNotMet() public createCampaign {
        vm.prank(DONATOR);
        vm.expectRevert(CryptoStarter.CryptoStarter__MinimumDonationValueNotMet.selector);
        cryptoStarter.donateToCampaign(0);
    }

    function testRevertWhenOwnerCantDonateToOwnCampaign() public createCampaign {
        vm.prank(CREATOR);
        vm.expectRevert(CryptoStarter.CryptoStarter__OwnerCantDonateToOwnCampaign.selector);
        cryptoStarter.donateToCampaign{value: MIN_DONATION}(0);
    }

    function testDonatorGetAddedToDonatorsArray() public createCampaign {
        vm.prank(DONATOR);
        cryptoStarter.donateToCampaign{value: MIN_DONATION}(0);
        CryptoStarter.Campaign memory campaign = cryptoStarter.getCampaign(0);
        assertEq(campaign.donators[0], DONATOR);
    }

    function testDonationGetAddedToDonationsArray() public createCampaign {
        vm.prank(DONATOR);
        cryptoStarter.donateToCampaign{value: MIN_DONATION}(0);
        CryptoStarter.Campaign memory campaign = cryptoStarter.getCampaign(0);
        assertEq(campaign.donations[0], MIN_DONATION);
    }

    function testEmitsEventOnDonationToACampaign() public createCampaign {
        vm.expectEmit(true, false, false, false, address(cryptoStarter));
        emit DonatedToCampaign(0, DONATOR, MIN_DONATION);
        vm.prank(DONATOR);
        cryptoStarter.donateToCampaign{value: MIN_DONATION}(0);
    }

    /**
     * Getters
     */
    function testGetDonatorsAndDonations() public createCampaign {
        vm.prank(DONATOR);
        cryptoStarter.donateToCampaign{value: MIN_DONATION}(0);
        (address[] memory donators, uint256[] memory donations) = cryptoStarter.getDonators(0);

        assertEq(donators[0], DONATOR);
        assertEq(donations[0], MIN_DONATION);
    }

    function testGetCampaigns() public createCampaign {
        cryptoStarter.createCampaign(DONATOR, TITLE, DESCRIPTION, TARGET, DEADLINE, IMAGE);
        CryptoStarter.Campaign[] memory campaigns = cryptoStarter.getCampaigns();
        assertEq(campaigns.length, 2);
    }
}
