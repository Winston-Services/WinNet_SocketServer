const TestTwo = props => {
  // console.log(props);
  const { values, handler } = props;
  return (
    <React.Fragment>
      {values.nodes.map(node =>
        <p key={`${node}`}>
          {node}
        </p>
      )}
    </React.Fragment>
  );
};
