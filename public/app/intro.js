const BlockCell = props => {
  const { grid, block, bit } = props;
  return <td>{`${grid[block][bit]}`}</td>;
};

const BlockCells = props => {
  let cells = [];
  for (let bit = 0; bit < 26; bit++) {
    cells.push(
      <BlockCell
        grid={props.grid}
        block={props.block}
        bit={bit}
        key={`block_cell_${bit}`}
      />
    );
  }
  return cells;
};

const BlockRow = props => {
  const { grid, block } = props;
  const HeaderMap = {
    "0": "A",
    "1": "B",
    "2": "C",
    "3": "D",
    "4": "E",
    "5": "F",
    "6": "G",
    "7": "H",
    "8": "I",
    "9": "J",
    "10": "K",
    "11": "L",
    "12": "M",
    "13": "N",
    "14": "O",
    "15": "P",
    "16": "Q",
    "17": "R",
    "18": "S",
    "19": "T",
    "20": "U",
    "21": "V",
    "22": "W",
    "23": "X",
    "24": "Y",
    "25": "Z"
  };
  return (
    <tr>
      <td
        style={{
          justifyContent: "center",
          alignSelf: "center",
          textAlign: "justify"
        }}
      >
        {HeaderMap[`${block}`]}:{" "}
        <input name="chart_A_A" className="chart-input" />
      </td>

      <BlockCells block={block} grid={grid} />
    </tr>
  );
};

const BlockRows = props => {
  let rows = [];
  for (let block = 0; block < 26; block++) {
    rows.push(
      <BlockRow block={block} grid={props.grid} key={`block_${block}`} />
    );
  }
  return rows;
};

const BlockTable = props => {
  return (
    <table className={props.className}>
      <tbody id="block">
        <BlockRows grid={props.grid} />
      </tbody>
    </table>
  );
};
const RenderBlockTable = props => {
  let { block = {}, offset = 0 } = props;
  // console.log("Render", block, offset);

  const grid = window.WinstonStateBlock.buildGrid(block, offset);
  // console.log(grid);
  return <BlockTable grid={grid} className={props.className} />;
};

const Intro = props => {
  const { values, handler } = props;
  return (
    <div
      className="main-wrapper"
      style={{ backgroundImage: "url('')", backgroundOpacity: "0.6" }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          zIndex: "-1",
          justifyContent: "center",
          alignSelf: "center",
          textAlign: "center"
        }}
      >
        <img
          src="./images/Winston_Watermark_Logo.png"
          style={{ opacity: "0.6" }}
        />
      </div>
      <div className="row-wrapper">
        <div className="wrapper">
          <h1 className="title-wrapper">Welcome to {values.currentHost}</h1>
        </div>
      </div>
      <div className="row-wrapper">
        <div className="wrapper">
          <TestOne values={values} handler={handler} />
        </div>
      </div>
      <div className="row-wrapper">
        <div className="wrapper" style={{ padding: "16px" }}>
          <TestTwo values={values} handler={handler} />
        </div>
        <div
          className="wrapper"
          style={{
            justifyContent: "center",
            alignSelf: "center",
            padding: "16px"
          }}
        >
          <Start />
        </div>
      </div>
      <div className="row-wrapper">
        <div className="wrapper">
          <h3>
            Current Index : 0 <button>+</button> <button>-</button>
          </h3>
          <RenderBlockTable
            values={values}
            handler={handler}
            className="chart_a"
          />
        </div>

        <div className="wrapper">
          <h3>
            Current Index : 0 <button>+</button> <button>-</button>
          </h3>
          <RenderBlockTable
            values={values}
            handler={handler}
            className="chart_b"
          />
        </div>
      </div>
    </div>
  );
};
