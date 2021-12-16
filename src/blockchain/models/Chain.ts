import * as crypto from 'crypto';
import { Block } from './Block';
import { Transaction } from './Transaction';

// The blockchain
class PrivateChain {
  chain: Block[] = [];

  // Most recent block
  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Proof of work system
  mine(nonce: number) {
    let solution = 1;
    console.log('⛏️  mining...');

    while (true) {

      const hash = crypto.createHash('MD5');
      hash.update((nonce + solution).toString()).end();

      const attempt = hash.digest('hex');

      if (attempt.substring(0, 4) === '0000') {
        console.log(`Solved: ${solution}`);
        return solution;
      }

      solution += 1;
    }
  }

  // Add a new block to the chain if valid signature & proof of work is complete
  addBlock(transaction: Transaction, senderPublicKey: string, signature: Buffer) {
    const verify = crypto.createVerify('SHA256');
    verify.update(transaction.toString());

    const isValid = verify.verify(senderPublicKey, signature);

    if (isValid) {
      const newBlock = new Block(transaction, this.lastBlock?.hash);
      this.mine(newBlock.nonce);
      this.chain.push(newBlock);
    }
  }
}

export const Chain = new PrivateChain()
