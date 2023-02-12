const TestOne = props => {
  const { values, handler } = props;
  React.useEffect(
    () => {
      let active = true;
      if (active) {
        if (!values.connected) {
          const socket = io('http://winston.services');
          socket.on("connected", client => {
            console.log("Client Returned", client);
            handler({
              ...values,
              socket,
              connected: "You are connected to the Node."
            });
          });
        }
      }
      return () => {
        active = false;
      };
    },
    [values, handler]
  );
  const verifyHost = () => {
    values.socket.once("identified_as", (data) => {
      console.log(data);
    });
    
    values.socket.once("genesis", (data) => {
      console.log("genesis", data);
      handler({...values, blocks:[data]})
    });
    values.socket.emit("identify", {});
    values.socket.emit("genesis", {});
  };
  return (
    <React.Fragment>
      <p>
        {values.connected}
      </p>
      <button onClick={verifyHost}>Verify Host</button>
    </React.Fragment>
  );
};
