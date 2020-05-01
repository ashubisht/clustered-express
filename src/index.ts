import * as express from "express";
import * as cluster from "cluster";
import * as os from "os";

if (cluster.isMaster) {
  const availableThreads = os.cpus().length;
  const forks =
    process.env.FORK_COUNT !== undefined
      ? parseInt(process.env.FORK_COUNT, 10)
      : availableThreads;
  console.log("Available core threads: ", availableThreads);
  console.log("using threads = ", forks);

  for (let i = 0; i < forks; i++) {
    cluster.fork();
    console.log("A cluster is started");
  }

  cluster.on("exit", (worker: cluster.Worker) => {
    console.log("A worker exited with id: ", worker.id);
    cluster.fork();
  });
} else {
  const app = express();

  app.get("/", (_, res: express.Response) => {
    res.send("This is a sample response");
  });

  app.get("/syncProcess", (_, res: express.Response) => {
    const count =
      process.env.COUNT !== undefined ? parseInt(process.env.COUNT, 10) : 10000;
    // tslint:disable-next-line: no-empty
    for (let i = 0; i < count; i++) {}
    res.send(`This sample response after empty loop of count = ${count}`);
  });

  app.listen(3000, () => {
    console.log("App started!");
  });
}
