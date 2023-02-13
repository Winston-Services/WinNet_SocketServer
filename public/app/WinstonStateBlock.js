const ALPHABET = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

class WinstonStateBlock {

  static keys = [
    address,
    block,
    state,
    precedingSignature,
    signature,
    index,
    nonce,
    timestamp,
    chainId
  ]

  constructor(input) {
    // debugger
    // console.log("Inside state handler", address, block);
    for (const key of this.keys) {
      const value = input[key]
      if (value === undefined) throw new Error(`StateBlockError: expected ${key} to be defined`)
      this[key] = value
    }
  }

  static buildGrid(block, offset = 0) {
    for (const key of Object.keys(block)) {
      if (block[key] === undefined) block[key] = '000'
    }
    const GRID = [];
    let ROW = [...ALPHABET]

    if (offset !== 0) {
      let _thisRow = [...ROW];
      const front = _thisRow.slice(offset);
      _thisRow = [...front, ..._thisRow.splice(0, offset)];
      ROW = [..._thisRow];
    }
    
    for (let i = 0; i < 26; i++) {
      let _thisRow = [...ROW];
      if (GRID.length === i) {
        const front = _thisRow.slice(i);
        _thisRow = [...front, ..._thisRow.splice(0, i)];
        GRID.push(_thisRow);
      }
    }
    return GRID
  }

  getBlock(offset) {
    // Offset  ROW   CELL
    // 00      00    00
    const cBlock = this.buildGrid(
      {
        A: this.block[0][0],
        B: this.block[0][1],
        C: this.block[0][2],
        D: this.block[0][3],
        E: this.block[0][4],
        F: this.block[0][5],
        G: this.block[0][6],
        H: this.block[0][7],
        I: this.block[0][8],
        J: this.block[0][9],
        K: this.block[0][10],
        L: this.block[0][11],
        M: this.block[0][12],
        N: this.block[0][13],
        O: this.block[0][14],
        P: this.block[0][15],
        Q: this.block[0][16],
        R: this.block[0][17],
        S: this.block[0][18],
        T: this.block[0][19],
        U: this.block[0][20],
        V: this.block[0][21],
        W: this.block[0][22],
        X: this.block[0][23],
        Y: this.block[0][24],
        Z: this.block[0][25]
      },
      offset
    );
    return cBlock;
  }
  getHeader() {
    return WinstonStateBlock.getBlockHeader(this.block);
  }
  verifyAddress() {
    if (!ethers.isAddress(this.address)) return false;
  }
  verifySignature() {
    if (this.address === "0x") {
      if (this.precedingSignature !== "0x") return false;
      if (this.signature !== "0x") return false;
      if (this.index !== 0) return false;
      if (this.nonce !== 0) return false;
      if (this.timestamp !== +new Date("02/14/2023")) return false;
      if (this.chainId !== "01010101") return false;
      let block = this.getHeader();
      if (block.length !== 26) return false;
      if (
        block.reduce(
          (p, b) => (WinstonStateBlock.isValidBits(b) ? p + 1 : p + 0),
          0
        ) !== 26
      )
        return false;
      if (!Array.isArray(this.state) || this.state.length > 11) return false;
      return true;
    }
    if (!ethers.isAddress(this.address)) return false;
    // if (verifySignature) return false;
    return false;
  }
  isValid() {
    return this.verifySignature();
  }

  static headerArrayToObject(arr = []) {
    const object = {}
    for (let i = 0; i < ALPHABET.length; i++) {
      object[ALPHABET[i]] = arr[i] || '000'
    }
    return object
  }

  static getBlockHeader(block) {
    const array = []
    for (let i = 0; i < ALPHABET.length; i++) {
      block
      array.push(block[0][i])
    }
    return array
  }
  static isValidBits(bits = "000") {
    if (typeof bits !== "string") return false;
    return bits.match(/[a-z,A-Z,0-9]/g).join("").length === 3;
  }

  toJSON() {
    const object = {}
    for (const key of this.keys) {
      object[key] = this[key]
    }
    return object
  }
}

export default WinstonStateBlock;
