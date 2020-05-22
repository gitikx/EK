export class FirelistUtils {
  static objectToArray(object: object): any {
    const array = [];
    for (const key in object) {
      object[key].key = key;
      array.push(object[key]);
    }
    return array;
  }

  static getNameFromArrayByKey(array: [], key: string): string {
    for (const element of array) {
      if ((element as any).key === key) {
        return (element as any).name;
      }
    }
  }
}
