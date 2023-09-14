import { RequestHandler } from "express";

const error404: RequestHandler = (req, res) => {
  return res.status(404).json({ message: "Could not find this route" });
};

export default error404;
