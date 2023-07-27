// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {CryptoStarter} from "../src/CryptoStarter.sol";

contract DeployCryptoStarter is Script {
    uint256 public constant MIN_DONATION = 0.01 ether;

    function run() external returns (CryptoStarter) {
        vm.startBroadcast();
        CryptoStarter cryptoStarter = new CryptoStarter(MIN_DONATION);
        vm.stopBroadcast();

        return cryptoStarter;
    }
}
