const keys = require("./keys");
const util = require("util");

// Express app setup
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Postgres client setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});

pgClient.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("CREATE TABLE IF NOT EXISTS values (number INT)", (err) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });
});
// Redis Client Setup
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// Express Route handlers
app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values");
  res.send(values.rows);
});

app.get("/values/current", async (req, res) => {
  redisClient.hgetall("values", async (err, values) => {
    if (err) {
      return res.status(500).send("Fatal error");
    }
    res.send(values);
  });
});

app.post("/values", (req, res) => {
  const index = req.body.index;
  if (parseInt(index) > 40) {
    return res.status(422).send("Index too high");
  }
  redisClient.hset("values", index, "Nothing yet!");
  redisPublisher.publish("insert", index);
  pgClient.query("insert into values(number) values($1)", [index]);
  res.send({ success: true });
});

app.listen(8080, (err) => {
  console.log("Listening on port 8080");
});
