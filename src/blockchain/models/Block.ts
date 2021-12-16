import * as crypto from 'crypto';
import { Transaction } from './Transaction';

// Individual block on the chain
export class Block {

  public nonce = Math.round(Math.random() * 999999999);

  constructor(
    public transaction: Transaction,
    public prevHash?: string,
    public timestamp = Date.now()
  ) { }

  get hash() {
    const str = JSON.stringify(this);
    const hash = crypto.createHash('SHA256');
    hash.update(str).end();
    return hash.digest('hex');
  }
}
