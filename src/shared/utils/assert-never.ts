export function assertNever(value: never, context?: string): never {
  throw new Error(`Unexpected value${context ? ` in ${context}` : ''}: ${String(value)}`);
}
