const BlockCells = props => {
  let cells = [];
  for (let bit = 0; bit < 26; bit++) {
    cells.push(
      <BlockCell
        grid={props.grid}
        block={props.block}
        bit={bit}
        key={`block_cell_${bit}`} />
    );
  }
  return cells;
};