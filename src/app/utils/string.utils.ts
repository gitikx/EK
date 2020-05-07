export class StringUtils {
  static compareWithoutCase(stringOne, stringTwo): boolean {
    return stringOne.toLowerCase() === stringTwo.toLowerCase();
  }
}
