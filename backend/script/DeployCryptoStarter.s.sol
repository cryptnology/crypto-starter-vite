// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {CryptoStarter} from "../src/CryptoStarter.sol";

contract DeployCryptoStarter is Script {
    function run() external returns (CryptoStarter) {
        vm.startBroadcast();
        CryptoStarter cryptoStarter = new CryptoStarter();
        vm.stopBroadcast();

        return cryptoStarter;
    }
}
