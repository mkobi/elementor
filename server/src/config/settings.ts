import nconf from "nconf";
import path from "path";

const secretsFile = "secrets.json";
const confFile = "local-settings.json";

// For local development with secrets.
nconf
  .env({ separator: "__" })
  .argv()
  .file("secrets", { file: path.join(__dirname, secretsFile) })
  .file("defaults", { file: path.join(__dirname, confFile) });

const settings: Settings = nconf.get();

export interface Settings {
  port: number;
  NODE_ENV: string;
  db: any;
}

export default settings;
