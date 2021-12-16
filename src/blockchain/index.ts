import { Chain } from './models/Chain';
import { Wallet } from './models/Wallet';

// Example usage

const satoshi = new Wallet()
const bob = new Wallet()
const alice = new Wallet()

satoshi.sendMoney(50, bob.publicKey)
bob.sendMoney(23, alice.publicKey)
alice.sendMoney(5, bob.publicKey)

console.log(Chain)
