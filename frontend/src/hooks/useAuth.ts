import { useEffect, useState } from 'react';
import { User } from "@prisma/client";
import { useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        const userFromCache = queryClient.getQueryData<User>(["user"]);
        const userStorageData = localStorage.getItem('user');
        const userFromStorage = userStorageData ? JSON.parse(userStorageData) : null;

        if (userFromStorage) {
            queryClient.setQueryData(["user"], userFromStorage);
            if (userFromCache) {
                setUser(userFromCache);
            }
        }
    }, [queryClient]);
    const login = (userData:User) => {
        localStorage.setItem('user', JSON.stringify(userData));
        queryClient.setQueryData(['user'], userData);
      };
    
      const logout = () => {
        localStorage.removeItem('user');
        queryClient.removeQueries({queryKey:['user']});
      };
    

    const isLogged = () => Boolean(user);

    return { isLogged, user,login,logout };
}

export type AuthContext = ReturnType<typeof useAuth>;
