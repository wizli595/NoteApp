import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { logout, login } from "../slices/authSlice";
import { User } from "@prisma/client";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const handleLogin = (user: User) => {
    dispatch(login(user));
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  const isAuthenticated = !!user;

  const userAgent = navigator.userAgent;

  return {
    userAgent,
    user,
    handleLogin,
    handleLogout,
    isAuthenticated,
  };
};

export type AuthHookReturnType = ReturnType<typeof useAuth>;
