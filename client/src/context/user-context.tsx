"use client"

import { UserContextResponse } from "@/interfaces/api/users"
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction
} from "react"

interface UserContextProviderProps {
    children: ReactNode
    user: UserContextResponse | null
}

interface UserContextType {
    user: UserContextResponse | null
    setUser: Dispatch<SetStateAction<UserContextResponse | null>>
}

const UserContext = createContext<UserContextType | null>(null)

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context)
        throw new Error("useContext must be used within a UserContextProvider.")

    return context
}

export function UserContextProvider({
    children,
    user
}: UserContextProviderProps) {
    const [currentUser, setUser] = useState<UserContextResponse | null>(user)

    useEffect(() => {
        setUser(user)
    }, [currentUser])

    return (
        <UserContext.Provider value={{ user: currentUser, setUser: setUser }}>
            {children}
        </UserContext.Provider>
    )
}