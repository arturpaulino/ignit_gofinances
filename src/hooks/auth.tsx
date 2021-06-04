import  React, {
  createContext,
  ReactNode,
  useContext
} from 'react';

interface AuthProps{
  children: ReactNode
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}
interface IAuthConextData {
  user: User;
}

const AuthContext = createContext({} as IAuthConextData)

function AuthProvider({children} : AuthProps) {
  const user ={
    id: '501262',
    name: 'Artur Paulino',
    email: 'artur.paulino@gmail.com',
  }
  return (
    <AuthContext.Provider value={{      user
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context  = useContext(AuthContext)
  return context;
}

export { AuthProvider , useAuth }
/*
897326690011-ocvvvg1ehv7k98t9uvpes5pfdrpk585p.apps.googleusercontent.com

897326690011-hgq6622bgbqh6oekteg6hmftdb6ef073.apps.googleusercontent.com
*/
