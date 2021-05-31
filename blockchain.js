const SHA256 = require('crypto-js/sha256')
const transaction = require('./transaction.js')

/**
 *  Clase para un bloque
 */
class Block {
  constructor(index, data, previousHash='') {
    this.index = index;
    this.date = new Date();
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.createHash();
    this.nonce = 0;
  }

  createHash() {
    return SHA256(this.index + this.date.toString() + this.data + this.nonce).toString();
  }

  mine(difficulty) {
    while(!this.hash.startsWith(difficulty)){
      this.nonce++;
      this.hash = this.createHash();
    }
  }
}

/**
 *  Clase para la cadena de bloques
 */
class BlockChain {
  constructor(genesis, difficulty='00'){
    this.chain = [this.createFirstBlock(genesis)];
    this.difficulty = difficulty;
  }

  createFirstBlock(genesis){
    return new Block(0, genesis);
  }

  getLastBlock(){
    return this.chain[this.chain.length-1];
  }

  addBlock(data){
    let prevBlock = this.getLastBlock();
    let block = new Block(prevBlock+1, data, prevBlock.hash);
    block.mine(this.difficulty);
    console.log('Mined! '+block.hash+' con nonce '+block.nonce);
    this.chain.push(block);
  }
  
  isValid(){
    for(let i=1; i<this.chain.length; i++){
      let prevBlock = this.chain[i-1];
      let currBlock = this.chain[i];
      if(currBlock.previousHash != prevBlock.hash)
        return false;
      if(currBlock.createHash()!=currBlock.hash)
        return false;
    }
    return true;
  }
}

t = new transaction.Transaction('Mie', 'David', 12.4);

let nanicoin = new BlockChain('info de genesis', '00');
nanicoin.addBlock('esta cryptomoneda lo va a petar');
nanicoin.addBlock('valgo 16K euros');
//console.log(JSON.stringify(nanicoin.chain, null, 2));
console.log(nanicoin.isValid());    // Imprime true
nanicoin.chain[1].data = 'Fake Data';
console.log(nanicoin.isValid());    // Informacion no valida introducida, imprime false





