
const Intro = props => {
  const { values, handler } = props;
  return (
    <div
      className="main-wrapper"
      style={{ backgroundOpacity: "0.6" }}
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
