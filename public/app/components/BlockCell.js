const BlockCell = props => {
  const { grid, block, bit } = props;
  return <td>{`${grid[block][bit]}`}</td>;
};