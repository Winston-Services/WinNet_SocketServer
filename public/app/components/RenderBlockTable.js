const RenderBlockTable = props => {
  let { block = {}, offset = 0 } = props;
  // console.log("Render", block, offset);
  const grid = window.WinstonStateBlock.buildGrid(block, offset);
  // console.log(grid);
  return <BlockTable grid={grid} className={props.className} />;
};