import { useContext } from 'react'
import { CyclesContext } from '../contexts/CycleContext'

export function useCycle() {
  const context = useContext(CyclesContext)
  return context
}
