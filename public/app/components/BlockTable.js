const BlockTable = props => {
  return (
    <table className={props.className}>
      <tbody id="block">
        <BlockRows grid={props.grid} />
      </tbody>
    </table>
  );
};
