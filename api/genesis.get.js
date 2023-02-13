import WinstonStateBlock from "../public/app/WinstonStateBlock.js";
const genesis = (req, res, next) => {
  res.send({block: new WinstonStateBlock({ address: "0x" })});
};

export default genesis;