const BlockCell = props => {
  const { grid, block, bit } = props;
  return <td>{`${grid[block][bit]}`}</td>;
};

const BlockCells = props => {
  let cells = [];
  for (let bit = 0; bit < 26; bit++) {
    cells.push(<BlockCell grid={props.grid} block={props.block} bit={bit} key={`block_cell_${bit}`}/>);
  }
  return cells;
};

const BlockRow = props => {
  const { grid, block } = props;
  return (
    <tr>
      <BlockCells block={block} grid={grid} />
    </tr>
  );
};

const BlockRows = props => {
  let rows = [];
  for (let block = 0; block < 26; block++) {
    rows.push(<BlockRow block={block} grid={props.grid} key={`block_${block}`}/>);
  }
  return rows;
};

const BlockTable = props => {
  return (
    <table>
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
  return <BlockTable grid={grid} />;
};

const Intro = props => {
  const { values, handler } = props;
  return (
    <div className="main-wrapper">
      <div className="row-wrapper">
        <div className="wrapper">
          <h1 className="title-wrapper">Welcome to the Winston Network</h1>
          <p>
            Host : {values.currentHost}
          </p>
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
        <RenderBlockTable values={values} handler={handler}/>
      </div>
    </div>
  );
};
