import * as fs from "fs";
import * as path from "path";

import { generateCss } from "./generate-css";

const sourceDirPath = path.resolve(__dirname, "../source");
const outputDirPath = path.resolve(__dirname, "../build");
const configFileNames = fs.readdirSync(sourceDirPath);

for (const configFileName of configFileNames) {
  const configFilePath = path.resolve(sourceDirPath, configFileName);

  generateCss(configFilePath, outputDirPath);
}
