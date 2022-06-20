import express, { json } from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.use(json());
let users = [];
let tweets = [];
app.post("/sign-up", (req, res) => {
  const body = req.body;
  if (!body.username || !body.avatar) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }
  const newUser = { username: body.username, avatar: body.avatar };
  users.push(newUser);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const body = req.body;
  const { user } = req.headers;
  const activeUser = users.find((item) => item.username === user);
  if (!user || !body.tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  const newTweet = {
    username: user,
    tweet: body.tweet,
    avatar: activeUser.avatar,
  };
  tweets.push(newTweet);
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const { page } = req.query;
  if (!page || page < 1) {
    res.status(400).send("Informe uma página válida");
    return;
  }
  const numberOfTweets = 10;
  const start = (page - 1) * numberOfTweets;
  const end = page * numberOfTweets;
  const tweetsOrder = [...tweets].reverse();
  res.send([...tweetsOrder].splice(start, end));
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;
  const userTweets = tweets.filter((tweet) => tweet.username === username);
  res.send([...userTweets].reverse());
});

app.listen(5000);
