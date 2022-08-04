import { differenceInSeconds } from 'date-fns'
import { useEffect } from 'react'
import { useCycle } from '../../../../hooks/useCycles'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const {
    minutes,
    seconds,
    activeCycle,
    markCurrentCycleAsFinished,
    setSecondsPassed,
    totalSeconds,
    amountSecondsPassed,
  } = useCycle()

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()

          clearInterval(interval)

          setSecondsPassed(totalSeconds)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    if (amountSecondsPassed < 0) {
      setSecondsPassed(0)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    amountSecondsPassed,
    totalSeconds,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
