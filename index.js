import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
let user = {
  username: "",
  avatar: "",
};
let tweet = {
  username: "",
  tweet: "",
};
app.listen(5000);
