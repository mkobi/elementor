import settings from "./config/settings";
import { initDatabase, runServer } from "./server";

const { port } = settings;

async function run() {
  await initDatabase();
  runServer(port);
}

run();
