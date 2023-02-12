const BlockRows = props => {
  let rows = [];
  for (let block = 0; block < 26; block++) {
    rows.push(
      <BlockRow block={block} grid={props.grid} key={`block_${block}`} />
    );
  }
  return rows;
};