import * as fs from "fs";
import * as path from "path";

import { camelToHyphen } from "./camel-to-hyphen";
import { Property, PropertyConfig } from "./property";
import { simplifyValue } from "./simplify-value";

export function generateCss(jsonPath: string, outputDirPath: string) {
  const jsonContent: PropertyConfig = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const groupNames = Object.getOwnPropertyNames(jsonContent);

  const allNameValueMap: Map<string, string> = new Map();
  const allPlaceholders: Property[] = []

  for (const groupName of groupNames) {
    for (const prop of jsonContent[groupName]) {
      if (prop.name && prop.value) {
        allNameValueMap.set(prop.name, prop.value);
      } else {
        if (!(prop.name && prop.fontFamily && (Object.getOwnPropertyNames(prop).length === 2))) {
          allPlaceholders.push(prop);
        }
      }
    }
  }

  const refPlaceholders: Map<string, string> = new Map();

  for (const placeholder of allPlaceholders) {
    for (const [key, value] of allNameValueMap) {
      if (value === placeholder.name) {
        allNameValueMap.delete(key);
        refPlaceholders.set(key, value);
      }
    }
  }

  for (const refKey of refPlaceholders.keys()) {
    for (const [key, value] of allNameValueMap) {
      if (value === refKey) {
        allNameValueMap.delete(key);
        refPlaceholders.set(key, value);
      }
    }
  }

  const pureValueMap: Map<string, string> = new Map();
  const refValueMap: Map<string, string> = new Map();
  const allKeys: string[] = Array.from(allNameValueMap.keys());

  for (const [key, value] of allNameValueMap) {
    if (allKeys.includes(value)) {
      refValueMap.set(key, value);
    } else {
      pureValueMap.set(key, simplifyValue(value));
    }
  }

  const variableResult: string[] = [];

  for (const [key, value] of pureValueMap) {
    variableResult.push(`  --${key}: ${value};`);
  }

  for (const [key, value] of refValueMap) {
    variableResult.push(`  --${key}: var(--${value});`);
  }

  const themeName = path.basename(jsonPath).split(".")[0];
  const themeDir = path.resolve(outputDirPath, themeName);

  if (!fs.existsSync(themeDir)) {
    fs.mkdirSync(themeDir);
  }

  const generatedVariableStr = `{\n${variableResult.join(`\n`)}\n}\n`;
  const fileName = `${themeName}/variables.css`;
  const outputFileName = path.resolve(outputDirPath, fileName);

  fs.writeFileSync(outputFileName, generatedVariableStr, "utf-8");

  const placeholderResult: string[] = [];

  for (const placeholder of allPlaceholders) {
    placeholderResult.push(`%${placeholder.name} {`);

    for (const key of Object.getOwnPropertyNames(placeholder)) {
      if (key !== "name") {
        const value = key === "fontFamily"
          ? `"${placeholder[key]}", sans-serif`
          : simplifyValue(placeholder[key]);

        placeholderResult.push(`  ${camelToHyphen(key)}: ${value};`);
      }
    }

    placeholderResult.push(`}\n`);
  }

  for (const [key, value] of refPlaceholders) {
    placeholderResult.push(`%${key} {
  @extend %${value};
}
`);
  }

  const placeholderFileName = `${themeName}/placeholders.scss`;
  const placeholderOutputFileName = path.resolve(outputDirPath, placeholderFileName);

  fs.writeFileSync(placeholderOutputFileName, placeholderResult.join(`\n`), "utf-8");
}
