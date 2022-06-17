import express, { json } from "express";
import cors from "cors";
const app = express();
console.log("oiiii");
app.use(cors());
app.use(json());
let users = [];
let tweets = [];
app.post("/sign-up", (req, res) => {
  const body = req.body;
  const newUser = { username: body.username, avatar: body.avatar };
  users.push(newUser);
  res.send("ok");
});
app.post("/tweets", (req, res) => {
  const body = req.body;
  const user = users.find((item) => item.username === body.username);
  const newTweet = {
    username: body.username,
    tweet: body.tweet,
    avatar: user.avatar,
  };
  tweets.push(newTweet);
  res.send("ok");
});
app.get("/tweets", (req, res) => {
  const numberOfTweets = 10;
  const tweetsOrder = [...tweets].reverse();
  if (tweetsOrder.length > 10) {
    const tweetsDisplayed = [];
    for (let i = 0; i < numberOfTweets; i++) {
      tweetsDisplayed.push(tweetsOrder[i]);
    }
    res.send(tweetsDisplayed);
  } else {
    res.send(tweetsOrder);
  }
});

app.listen(5000);
