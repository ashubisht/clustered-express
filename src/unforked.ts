import * as express from "express";

const app = express();

app.get("/", (_, res: express.Response) => {
  res.send("This is a sample response");
});

app.get("/syncProcess", (_, res: express.Response) => {
  const count =
    process.env.COUNT !== undefined ? parseInt(process.env.COUNT, 10) : 10000;
  // tslint:disable-next-line: no-empty
  for (let i = 0; i < count; i++) { }
  res.send(`This sample response after empty loop of count = ${count}`);
});

app.listen(3000, () => {
  console.log("App started!");
});