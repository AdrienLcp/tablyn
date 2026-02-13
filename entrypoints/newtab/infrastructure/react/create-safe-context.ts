import { createContext, useContext } from 'react'

export const createSafeContext = <T>(
  displayName: string
): [React.Context<T | null>, () => T] => {
  const Context = createContext<T | null>(null)
  Context.displayName = displayName

  const useSafeContext = (): T => {
    const value = useContext(Context)
    if (!value) {
      throw new Error(
        `use${displayName} must be used within a ${displayName}Provider`
      )
    }
    return value
  }

  return [Context, useSafeContext]
}
