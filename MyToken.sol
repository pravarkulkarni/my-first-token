// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.11;

contract MyToken {
    address owner;
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;

        balances[owner] = 1000;
    }

    function transfer(uint amount, address recipient) public {
        require(balances[msg.sender] >= amount, 'You didnt have enough fund');
        require(balances[msg.sender] - amount <= balances[msg.sender]);
        require(balances[recipient] + amount >= balances[recipient]);
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
    }
}
