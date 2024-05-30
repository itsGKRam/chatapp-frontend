import { clsx, type ClassValue } from 'clsx'
import { io } from 'socket.io-client'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getTime(time: string | number | Date) {
  const date = new Date(time)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  // 24hr to 12hr

  return `${hours > 12 ? hours - 12 : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  } ${ampm}`
}

export function getDate(time: string | number | Date) {
  const date = new Date(time)
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export const socket = io('http://localhost:4000', {
  transports: ['websocket'],
})
