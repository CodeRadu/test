import { FormEvent, useRef } from 'react'

interface User {
  id?: string
  name: string
}

export default function Add() {
  const nameRef = useRef<HTMLInputElement>(null)
  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const add = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        name: nameRef.current?.value,
      }),
      headers: {
        ContentType: 'Application/JSON',
      },
    })
    console.log(add.body)
  }
  return (
    <form onSubmit={onSubmit}>
      <h1>Add user</h1>
      <input type='text' placeholder='Name' required ref={nameRef} />
      <button type='submit'>Add</button>
    </form>
  )
}
