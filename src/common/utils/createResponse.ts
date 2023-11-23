export type ResponseWithOutDataJson = {
  message: string | string[];
};

export type ResponseWithDataJson<T> = ResponseWithOutDataJson & { data: T };

export function createResponseWithOutDataJson(
  message: string | string[]
): ResponseWithOutDataJson {
  message = typeof message === 'string' ? [message] : message;

  return { message };
}

export function createResponseWithDataJson<T>(
  message: string | string[],
  data: T
): ResponseWithDataJson<T> {
  message = typeof message === 'string' ? [message] : message;

  return { message, data };
}
