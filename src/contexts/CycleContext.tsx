import React, { createContext, useEffect, useState } from 'react'
import { NewCycleFormData } from '../pages/Home'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptDate?: Date
  finishedDate?: Date
}

type CycleContextData = {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  minutes: string
  seconds: string
  totalSeconds: number
  amountSecondsPassed: number
  handleAddNewCycle: (data: NewCycleFormData) => void
  handleInterruptCycle: () => void
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CycleContext = createContext({} as CycleContextData)

interface CycleProviderProps {
  children: React.ReactNode
}

export function CycleProvider({ children }: CycleProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  function handleAddNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        }
        return cycle
      }),
    )
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptDate: new Date() }
        }
        return cycle
      }),
    )

    setActiveCycleId(null)
  }

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        handleAddNewCycle,
        minutes,
        seconds,
        handleInterruptCycle,
        setSecondsPassed: setAmountSecondsPassed,
        totalSeconds,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
