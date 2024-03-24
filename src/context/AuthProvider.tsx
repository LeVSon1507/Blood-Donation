import { createContext, useContext, useState } from 'react';
import { Volunteer } from 'src/utils';

interface User {
   userId: string;
   img?: string;
   email: string;
   phoneNumber?: string;
   city?: string;
   ward?: string;
   district?: string;
   address?: string;
   role?: string;
   volunteers: Volunteer;
   gender?: string;
   fullname?: string;
   cccd?: string;
   birthdate?: string;
   hospitals?: any;
   bloodbank?: any;
   notifications?: any[];
}

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
      userId: '',
      img: '',
      email: '',
      phoneNumber: '',
      city: '',
      ward: '',
      district: '',
      address: '',
      role: '',
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
