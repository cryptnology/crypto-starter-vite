// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import {DeployCryptoStarter} from "../script/DeployCryptoStarter.s.sol";
import {CryptoStarter} from "../src/CryptoStarter.sol";
import {Test} from "forge-std/Test.sol";

contract DeployCryptoStarterTest is Test {
    address public constant CRYPTO_STARTER_ADDRESS = 0x90193C961A926261B756D1E5bb255e67ff9498A1;

    function testDeployCryptoStarter() external {
        DeployCryptoStarter deployer = new DeployCryptoStarter();
        CryptoStarter cryptoStarter = deployer.run();
        assertEq(address(cryptoStarter), CRYPTO_STARTER_ADDRESS);
    }
}
