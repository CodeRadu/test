import { useRouter } from 'next/router'
import { FormEvent, useRef, useState } from 'react'

interface User {
  id?: string
  name: string
}

export default function Add() {
  const { query } = useRouter()
  const [adding, setAdding] = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)
  async function onSubmit(e: FormEvent) {
    const amount = query.count as unknown as number
    e.preventDefault()
    setAdding(true)
    for (let count = 1; count <= amount; count++) {
      const add = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
          name: nameRef.current?.value! + count,
        }),
        headers: {
          ContentType: 'Application/JSON',
        },
      })
    }
    setAdding(false)
  }
  return (
    <form onSubmit={onSubmit}>
      <h1>Add {query.count} users</h1>
      <input type='text' placeholder='Name' required ref={nameRef} />
      <button type='submit' disabled={adding}>
        Add
      </button>
    </form>
  )
}
