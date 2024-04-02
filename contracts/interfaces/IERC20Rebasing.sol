// SPDX-License-Identifier: BUSL-1.1
pragma solidity =0.7.6;

enum YieldMode {
    AUTOMATIC,
    VOID,
    CLAIMABLE
}

interface IERC20Rebasing {
    // changes the yield mode of the caller and update the balance
    // to reflect the configuration
    function configure(YieldMode) external returns (uint256);

    function claim(
        address recipient,
        uint256 amount
    ) external returns (uint256);
    // read the claimable amount for an account
    function getClaimableAmount(
        address account
    ) external view returns (uint256);
}
