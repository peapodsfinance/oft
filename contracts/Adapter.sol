// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFTAdapter.sol';

contract Adapter is OFTAdapter {
  constructor(
    address _token,
    address _lzEndpoint,
    address _delegate
  ) OFTAdapter(_token, _lzEndpoint, _delegate) Ownable(_delegate) {}
}
