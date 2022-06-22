export function camelToHyphen(str = ""): string {
  return str.replace(/[A-Z]/g, match => {
    return `-${match.toLocaleLowerCase()}`;
  });
}
