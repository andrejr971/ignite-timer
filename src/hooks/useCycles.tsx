import { useContext } from 'react'
import { CycleContext } from '../contexts/CycleContext'

export function useCycle() {
  const context = useContext(CycleContext)
  return context
}
