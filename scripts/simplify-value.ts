export function simplifyValue(str = ""): string {
  return str
    .replace(/\b0((px)|(em)|%)/g, "0")
    .replace(/#(.)\1(.)\2(.)\3((.)\5)?\b/g, "#\$1\$2\$3\$5");
}
