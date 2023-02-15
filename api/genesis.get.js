import WinstonStateBlock from "../public/app/WinstonStateBlock.js";
import _genesis from './../genesis.json' assert { type: 'json' }
const genesis = (req, res, next) => {
  res.send({block: new WinstonStateBlock(_genesis)})
};

export default genesis;