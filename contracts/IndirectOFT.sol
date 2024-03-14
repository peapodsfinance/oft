// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@layerzerolabs/lz-evm-oapp-v2/contracts/oft/OFTCore.sol';
import './interfaces/IERC20Bridgeable.sol';

contract IndirectOFT is OFTCore {
  IERC20Bridgeable immutable TOKEN;

  constructor(
    IERC20Bridgeable _TOKEN,
    address _lzEndpoint,
    address _delegate
  ) OFTCore(18, _lzEndpoint, _delegate) Ownable(_delegate) {
    TOKEN = _TOKEN;
  }

  function token() external view returns (address) {
    return address(TOKEN);
  }

  function approvalRequired() external pure virtual returns (bool) {
    return true;
  }

  function _debit(
    uint256 _amountLD,
    uint256 _minAmountLD,
    uint32 _dstEid
  )
    internal
    virtual
    override
    returns (uint256 amountSentLD, uint256 amountReceivedLD)
  {
    (amountSentLD, amountReceivedLD) = _debitView(
      _amountLD,
      _minAmountLD,
      _dstEid
    );
    TOKEN.burnFrom(_msgSender(), amountSentLD);
  }

  function _credit(
    address _to,
    uint256 _amountLD,
    uint32 /*_srcEid*/
  ) internal virtual override returns (uint256 amountReceivedLD) {
    TOKEN.mint(_to, _amountLD);
    return _amountLD;
  }
}
