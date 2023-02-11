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
        <div className="wrapper" style={{padding:"16px"}}>
          <TestTwo values={values} handler={handler} />
        </div>
        <div className="wrapper" style={{justifyContent:"center", alignSelf:"center", padding:"16px"}}>
          <Start />
        </div>
      </div>
    </div>
  );
};
