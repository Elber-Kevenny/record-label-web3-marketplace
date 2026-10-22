import express from "express";

const PORT = 3000;

const app = express();

app.use(express.json());

const server = app.listen(PORT, () => {
  console.log(`server is running at: http://localhost:${PORT}`);
});


