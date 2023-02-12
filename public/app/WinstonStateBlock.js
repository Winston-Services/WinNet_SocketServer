class WinstonStateBlock {
  constructor({
    address = "0x",
    block = [
      ...WinstonStateBlock.buildGrid(
        {
          A: "000",
          B: "000",
          C: "000",
          D: "000",
          E: "000",
          F: "000",
          G: "000",
          H: "000",
          I: "000",
          J: "000",
          K: "000",
          L: "000",
          M: "000",
          N: "000",
          O: "000",
          P: "000",
          Q: "000",
          R: "000",
          S: "000",
          T: "000",
          U: "000",
          V: "000",
          W: "000",
          X: "000",
          Y: "000",
          Z: "000"
        },
        0
      )
    ],
    state = [],
    precedingSignature = "0x",
    signature = "0x",
    index = 0,
    nonce = 0,
    timestamp = +new Date("02/14/2023"),
    chainId = "01010101"
  }) {
    // debugger
    // console.log("Inside state handler", address, block);
    this.address = address;
    this.block = block;
    this.state = state;
    this.precedingSignature = precedingSignature;
    this.signature = signature;
    this.index = index;
    this.nonce = nonce;
    this.timestamp = timestamp;
    this.chainId = chainId;
  }

  static buildGrid(
    {
      A = "000",
      B = "000",
      C = "000",
      D = "000",
      E = "000",
      F = "000",
      G = "000",
      H = "000",
      I = "000",
      J = "000",
      K = "000",
      L = "000",
      M = "000",
      N = "000",
      O = "000",
      P = "000",
      Q = "000",
      R = "000",
      S = "000",
      T = "000",
      U = "000",
      V = "000",
      W = "000",
      X = "000",
      Y = "000",
      Z = "000"
    },
    offset = 0
  ) {
    const GRID = [];
    let ROW = [
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      H,
      I,
      J,
      K,
      L,
      M,
      N,
      O,
      P,
      Q,
      R,
      S,
      T,
      U,
      V,
      W,
      X,
      Y,
      Z
    ];
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
    return [...GRID];
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
    return {
      A: arr[0] || "000",
      B: arr[1] || "000",
      C: arr[2] || "000",
      D: arr[3] || "000",
      E: arr[4] || "000",
      F: arr[5] || "000",
      G: arr[6] || "000",
      H: arr[7] || "000",
      I: arr[8] || "000",
      J: arr[9] || "000",
      K: arr[10] || "000",
      L: arr[11] || "000",
      M: arr[12] || "000",
      N: arr[13] || "000",
      O: arr[14] || "000",
      P: arr[15] || "000",
      Q: arr[16] || "000",
      R: arr[17] || "000",
      S: arr[18] || "000",
      T: arr[19] || "000",
      U: arr[20] || "000",
      V: arr[21] || "000",
      W: arr[22] || "000",
      X: arr[23] || "000",
      Y: arr[24] || "000",
      Z: arr[25] || "000"
    };
  }

  static getBlockHeader(block) {
    return [
      block[0][0],
      block[0][1],
      block[0][2],
      block[0][3],
      block[0][4],
      block[0][5],
      block[0][6],
      block[0][7],
      block[0][8],
      block[0][9],
      block[0][10],
      block[0][11],
      block[0][12],
      block[0][13],
      block[0][14],
      block[0][15],
      block[0][16],
      block[0][17],
      block[0][18],
      block[0][19],
      block[0][20],
      block[0][21],
      block[0][22],
      block[0][23],
      block[0][24],
      block[0][25]
    ];
  }
  static isValidBits(bits = "000") {
    if (typeof bits !== "string") return false;
    return bits.match(/[a-z,A-Z,0-9]/g).join("").length === 3;
  }
  toJSON() {
    return JSON.parse(
      JSON.stringify({
        address: this.address,
        block: this.getHeader(),
        state: this.state,
        precedingSignature: this.precedingSignature,
        signature: this.signature || undefined,
        index: this.index,
        nonce: this.nonce,
        timestamp: this.timestamp,
        chainId: this.chainId
      })
    );
  }
}

export default WinstonStateBlock;
