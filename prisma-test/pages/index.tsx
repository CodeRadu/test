import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface User {
  id: string
  name: string
}

function Home() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/user', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res)
        setLoading(false)
      })
  }, [])

  async function handleDelete(id: string) {
    await fetch(`/api/user/${id}`, {
      method: 'DELETE',
    })
    fetch('/api/user', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        setUsers(res)
        setLoading(false)
      })
  }

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        'Loading users'
      ) : (
        <div>
          {users.length != 0 ? (
            <table border={1}>
              <tr>
                <th>Id</th>
                <th>Name</th>
              </tr>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleDelete(user.id)
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </table>
          ) : (
            'No users found. Add one bellow'
          )}
        </div>
      )}

      <p>
        <Link href={'/add'}>Add user</Link>
      </p>
    </div>
  )
}

export default Home
