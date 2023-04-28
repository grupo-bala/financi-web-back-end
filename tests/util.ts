export interface Mocked<T> {
  mockImplementation: (mockMethods: () => { [Property in keyof T]?: T[Property] }) => void
}

export function mock<T>(object: new (...args: any[]) => T): Mocked<T> {
  return object as unknown as Mocked<T>;
}