const express = require("express");
const client = require("./connect");
const port = 5000;

const app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  return res.json({ data: client });
});

app.get("/search", async (req, res) => {
  const result = await client.search({
    index: "blog",
    query: {
      match_all: {},
    },
  });
  return res.json({ data: result.hits.hits });
});

app.get("/near", async (req, res) => {
  const result = await client.search({
    index: "blog",
    query: {
      span_near: {
        clauses: [
          { span_term: { title: "quasi" } },
          { span_term: { title: "enim" } },
        ],
        slop: 1,
        in_order: false,
      },
    },
  });

  return res.json({ data: result });
});

app.get("/match", async (req, res) => {
  const result = await client.search({
    index: "blog",
    query: {
      match: { title: "Saepe enim" },
    },
  });

  return res.json({ data: result });
});

app.get("/phrase", async (req, res) => {
  const result = await client.search({
    index: "blog",
    query: {
      match_phrase: {
        title: { query: "quasi Enim Saepe maxime", slop: 1 },
      },
    },
  });

  return res.json({ data: result });
});

app.get("/query-string", async (req, res) => {
  const result = await client.search({
    index: "blog",
    query: {
      query_string: {
        default_field: "title",
        // query: '("quasi Enim"~1) OR ("enim quasi"~1)',
        // query: '"quasi Enim"~0',
        query: '"Enim quasi"~1',
        // in_order: false
        // phrase_slop: 1
      }
    },
  });

  return res.json({ data: result });
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
