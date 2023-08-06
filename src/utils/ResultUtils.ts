export default class ResultUtils {
  static success(result: any): Result<any> {
    return {
      success: true,
      result: result,
      records: null,
    };
  }

  static successWithEntities(entities: any[], records: number): Result<any> {
    return {
      success: true,
      result: entities,
      records: records,
    };
  }

  static successEmpty(): Result<any> {
    return this.successWithEntities([], 0);
  }

  static error(message: string): Result<any> {
    return {
      success: false,
      message: message,
      result: null,
      records: null,
    };
  }
}

export interface Result<T> {
  success: boolean;
  message?: string;
  result: T;
  records: number | null;
}
