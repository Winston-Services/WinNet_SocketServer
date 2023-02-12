class RickleScript {
  _name;
  name() {
    return `${this._name}`;
  }
  _loop = false;
  get loop() {
    return this._loop;
  }
  set loop(value) {
    throw Error("Cannot set loop externally.");
  }
  constructor(state, blockHeader, mem) {
    if (!mem) {
      this.__memory = RickleScript.memory();
    } else {
      this.__memory = mem;
    }
  }
  block(arr) {
    let _block = [...arr];
    let cube = [];
    for (let i = 0; i < 26; i++) {
      let Grid = WinstonStateBlock.buildGrid(
        WinstonStateBlock.headerArrayToObject(_block),
        i
      );
      cube.push(Grid);
    }
    return [...cube];
  }
  static memory() {
    const _address = [];
    const _pos = 0;
    return {
      current: () => {
        return _address[_pos];
      },
      next: () => {
        if (_pos + 1 >= _address.length) return -1;
        return _address[_pos + 1];
      },
      prev: () => {
        if (_pos === 0) return -1;
        return _address[_pos - 1];
      },
      peek: pos => {
        if (pos > _address.length) return -1;
        if (pos < 0) return -1;
        return _address[pos];
      },
      push: v => {
        return _address.push(v);
      },
      pop: () => {
        return _address.pop();
      },
      shift: () => {
        return _address.shift();
      },
      unshift: v => {
        return _address.unshift(v);
      },
      slice: (start, end = undefined) => {
        _address = _address.slice(start, end);
        return [..._address];
      },
      splice: (start, deleteCount = undefined) => {
        _address = _address.splice(start, deleteCount);
        return [..._address];
      }
    };
  }
  _activeBlock = [];
  get activeBlock() {
    return this._activeBlock;
  }
  set activeBlock(value) {
    this._activeBlock = value;
  }
  address(x) {
    //if(!WinstonStateBlock.isVerifiedAddress(x)) { throw Error("Invalid Memory Address."); }
    return (this._address = x);
  }
  header(arr) {
    // set block grid from header.
    return this.block(arr);
  }
  /**
       * Linear Reads
       */
  read(offset, block, bits) {
    let current = this.block(this.activeBlock);
    let readMemory = this.memory();
    if (Array.isArray(offset)) {
      if (!Array.isArray(block) || !Array.isArray(bits)) {
        if (Array.isArray(block)) {
          for (let o in offset) {
            for (let b in block) {
              readMemory.push(current[o][b][bits]);
            }
          }
        } else {
          for (let o in offset) {
            for (let bi in bits) {
              readMemory.push(current[o][block][bi]);
            }
          }
        }
      } else {
        for (let o in offset) {
          for (let b in block) {
            for (let bi in bits) {
              readMemory.push(current[o][b][bi]);
            }
          }
        }
      }
    } else {
      if (Array.isArray(block) || Array.isArray(bits)) {
        if (Array.isArray(block)) {
          for (let o in offset) {
            for (let b in block) {
              readMemory.push(current[o][b][bits]);
            }
          }
        } else {
          for (let o in offset) {
            for (let bi in bits) {
              readMemory.push(current[o][block][bi]);
            }
          }
        }
      } else readMemory.push(current[offset][block][bits]);
    }
    return readMemory;
  }
  readY(offset, block, bits) {
    let current = this.block(this.activeBlock);
    let readMemory = this.memory();
    if (Array.isArray(offset)) {
    } else {
      if (Array.isArray(block) || Array.isArray(bits)) {
      } else {
        for (let Y = 0; i <= current.length; Y++) {
          readMemory.push(current[offset + Y][block][bits]);
        }
      }
    }
    return readMemory;
  }
  readZ(offset, block, bits) {}
  readXX(offset, block, bits) {}
  readYX(offset, block, bits) {}
  readZX(offset, block, bits) {}
  readXY(offset, block, bits) {}
  readYY(offset, block, bits) {}
  readZY(offset, block, bits) {}
  readXZ(offset, block, bits) {}
  readYZ(offset, block, bits) {}
  readZZ(offset, block, bits) {}
  end() {
    return this.__memory.join("");
  }
  space() {
    this.__memory.push(" ");
  }
  repeat(n) {
    for (let i = 0; i < n; i++) this.__memory.push(this.__memory);
  }
  static add(n1, n2) {
    return (parseInt(n1, 2) + parseInt(n2, 2)).toString(2);
  }
  static subtract(n1, n2) {
    return (parseInt(n1, 2) - parseInt(n2, 2)).toString(2);
  }
  static multiply(n1, n2) {
    return (parseInt(n1, 2) * parseInt(n2, 2)).toString(2);
  }
  static divide(n1, n2) {
    return (parseInt(n1, 2) / parseInt(n2, 2)).toString(2);
  }
  static not(n1) {
    return ~parseInt(n1, 2);
  }
  static and(n1, n2) {
    return (parseInt(n1, 2) & parseInt(n2, 2)).toString(2);
  }
  static xor(n1, n2) {
    return (parseInt(n1, 2) ^ parseInt(n2, 2)).toString(2);
  }
  static or(n1, n2) {
    return (parseInt(n1, 2) | parseInt(n2, 2)).toString(2);
  }
  static nor(n1, n2) {
    return this.not(this.or(~n1, ~n2).toString(2)).toString(2);
  }
  loop() {
    this._loop = true;
  }
  compile(fileType = "txt") {
    switch (fileType) {
      case "txt":
      default:
        return this._memory.join("");
    }
  }
}

export default RickleScript;