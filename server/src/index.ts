import settings from "./config/settings";
import { runServer } from "./server";

const { port } = settings;

runServer(port);
