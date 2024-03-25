import { createContext, useContext, useState } from 'react';
import { User } from 'src/utils';

interface AuthContextType {
   user: User;
   handleSetUser: (user: User) => void;
}

interface AuthProviderProviderProps {
   children: React.ReactNode;
}

const AuthContext: React.Context<AuthContextType> = createContext<AuthContextType>({
   user: null,
   handleSetUser: (user: User) => {},
});

const AuthProvider = ({ children }: AuthProviderProviderProps) => {
   const [user, setUser] = useState<User>({
      userId: null,
      img: '',
      email: '',
      phoneNumber: '',
      city: null,
      ward: null,
      district: null,
      address: '',
      role: null,
      volunteers: null,
   });

   const handleSetUser = user => {
      setUser(user);
   };

   return <AuthContext.Provider value={{ user, handleSetUser }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
   const context = useContext(AuthContext);
   if (typeof context === 'undefined') throw new Error('useAuth must be used within AuthProvider');
   return context;
};

export { AuthProvider, useAuth };
