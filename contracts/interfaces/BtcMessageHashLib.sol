// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

library BtcMessageHashLib {
    bytes constant private BTC_PREFIX = "Bitcoin Signed Message:\n";

    function convertToBtcMessageHash(bytes32 ethMessageHash) internal pure returns(bytes32) {
        string memory ethMessageHashHexString = toHexString(ethMessageHash);

        string memory prefixedEthMessageHashHexString = string(abi.encodePacked("0x", ethMessageHashHexString));

        return toBtcSignedMessageHash(prefixedEthMessageHashHexString);
    }

    function toBtcSignedMessageHash(string memory message) internal pure returns (bytes32) {
        return toBtcSignedMessageHash(bytes(message));
    }

    function toBtcSignedMessageHash(bytes memory message) internal pure returns (bytes32) {
        return sha256(abi.encodePacked(
            sha256(abi.encodePacked(
                encodeVarint(BTC_PREFIX.length),
                BTC_PREFIX,
                encodeVarint(message.length),
                message
            ))
        ));
    }

    function encodeVarint(uint256 number) internal pure returns (bytes memory) {
        if (number < 0xfd) {
            return abi.encodePacked(uint8(number));
        } else if (number <= 0xffff) {
            return abi.encodePacked(uint8(0xfd), uint16(number));
        } else if (number <= 0xffffffff) {
            return abi.encodePacked(uint8(0xfe), uint32(number));
        } else {
            return abi.encodePacked(uint8(0xff), uint64(number));
        }
    }

    function toHexString(bytes32 data) internal pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(64);
        for (uint256 i = 0; i < 32; i++) {
            str[i*2] = alphabet[uint8(data[i] >> 4)];
            str[1+i*2] = alphabet[uint8(data[i] & 0x0f)];
        }
        return string(str);
    }
}
