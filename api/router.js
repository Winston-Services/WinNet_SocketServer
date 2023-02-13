import express from "express";
import genesis from './genesis.get.js';
import help from './help.get.js';
const Router = express.Router();
Router.get("/api/test", (req, res) => {
  return res.send({ status: "Ok!" });
});
Router.get("/api/help", help);
Router.get("/api/genesis", genesis);
export default Router;
