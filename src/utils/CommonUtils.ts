export default class CommonUtils {
  static isEmpty(str: string): boolean {
    return !str || str.length === 0;
  }
}
