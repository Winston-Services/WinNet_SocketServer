import WinstonStateBlock from "../public/app/WinstonStateBlock.js";
const page = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/index.css" crossorigin>
    <title>Winston Network API</title>
</head>

<body>
  <div class="main-wrapper">
    <div class="wrapper">
      <h3>Winston Network API</h3>
      <h4>Help Documentation</h4>
      <caption>This project is an open source blockchain network</caption>
    </div>
    <div class="wrapper">
      You can find extended documentation and information about the Winston Project on github.
      <a href="https://github.com/Winston-Services/">Winston on Github</a>
    </div>
  </div>
</body>
</html>
`
const help = (req, res, next) => {
  res.send(page);
};

export default help;