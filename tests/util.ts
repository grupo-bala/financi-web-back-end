/* eslint-disable @typescript-eslint/no-explicit-any */
type MockedKeys<T> = {
  [key in keyof T]?: T[key];
}

type MockedMethods<T> = T extends { new (...args: unknown[]): infer R }
  ? MockedKeys<R> & MockedKeys<T>
  : MockedKeys<T>;

type Mocked<T> = {
  mockImplementation: (mockMethods: () => MockedMethods<T>) => void;
}

export function mock<T>(object: new (...args: any[]) => T) {
  return object as unknown as Mocked<T>;
}