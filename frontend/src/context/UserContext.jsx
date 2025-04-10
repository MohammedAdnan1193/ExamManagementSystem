// src/context/UserContext.jsx

import { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [student, setStudent] = useState(null)
  const [admin, setAdmin] = useState(null)

  return (
    <UserContext.Provider value={{ student, setStudent, admin, setAdmin }}>
      {children}
    </UserContext.Provider>
  )
}
