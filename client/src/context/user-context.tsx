"use client"

import { UserContextResponse } from "@/interfaces/api/users"
import {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useContext,
    useEffect, useMemo,
    useState
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
}: Readonly<UserContextProviderProps>) {
    const [currentUser, setCurrentUser] = useState<UserContextResponse | null>(user)

    useEffect(() => {
        setCurrentUser(user)
    }, [currentUser, user])
    
    const userObjectMemo = useMemo(() => ({ user: currentUser, setUser: setCurrentUser }), [currentUser]);

    return (
        <UserContext.Provider value={userObjectMemo}>
            {children}
        </UserContext.Provider>
    )
}
