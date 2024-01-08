import { createContext } from 'react'

export interface ScreenContextProps {
  currentScreen: string
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>
}

const ScreenContext = createContext<ScreenContextProps>({
  currentScreen: '',
  setCurrentScreen: () => {
    console.log('')
  },
})

export { ScreenContext }
