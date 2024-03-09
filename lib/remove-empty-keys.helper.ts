export function removeEmptyKeys(object: any) {
  const objectKeys = Object.keys(object);
  for (let index = 0; index < objectKeys.length; index++) {
    if (
      typeof object[objectKeys[index]] === "object" &&
      !Array.isArray(object[objectKeys[index]])
    ) {
      object[objectKeys[index]] = removeEmptyKeys(object[objectKeys[index]]);
      if (!Object.keys(object[objectKeys[index]]).length) {
        delete object[objectKeys[index]];
      }
    } else if (
      typeof object[objectKeys[index]] === "object" &&
      Array.isArray(object[objectKeys[index]]) &&
      !object[objectKeys[index]].length
    ) {
      delete object[objectKeys[index]];
    } else if (
      object[objectKeys[index]] === undefined ||
      object[objectKeys[index]] === null ||
      object[objectKeys[index]] === ""
    ) {
      delete object[objectKeys[index]];
    }
  }
  return object;
}
