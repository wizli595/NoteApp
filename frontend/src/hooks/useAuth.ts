import { useEffect, useState } from 'react';
import { User } from "@prisma/client";
import { useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const queryClient = useQueryClient();
    useEffect(()=>{
    
    const userFromCache = queryClient.getQueryData<User>(["user"]);
    const userStorageData = localStorage.getItem('user');
    const userFromStorage = userStorageData ? JSON.parse(userStorageData ) : null;
    if(userFromStorage){
        setIsLogin(true);
        queryClient.setQueryData(["user"],userFromStorage)
        if(userFromCache){
            setUser(userFromCache)
        }
    }
    },[queryClient])
    const isLogged = () => isLogin;
    console.log(user)
    return { isLogged, user };
}

export type AuthContext = ReturnType<typeof useAuth>;
