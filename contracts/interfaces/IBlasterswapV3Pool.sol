// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import "./pool/IBlasterswapV3PoolImmutables.sol";
import "./pool/IBlasterswapV3PoolState.sol";
import "./pool/IBlasterswapV3PoolDerivedState.sol";
import "./pool/IBlasterswapV3PoolActions.sol";
import "./pool/IBlasterswapV3PoolOwnerActions.sol";
import "./pool/IBlasterswapV3PoolEvents.sol";

/// @title The interface for a Blasterswap V3 Pool
/// @notice A Blasterswap pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IBlasterswapV3Pool is
    IBlasterswapV3PoolImmutables,
    IBlasterswapV3PoolState,
    IBlasterswapV3PoolDerivedState,
    IBlasterswapV3PoolActions,
    IBlasterswapV3PoolOwnerActions,
    IBlasterswapV3PoolEvents
{}
