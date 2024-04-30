import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

type Props = {
    error: unknown;
}

export const Error = ({error}: Props) => {
    const navigate = useNavigate();
    useEffect(() => { 
        if (error) {
            navigate({ to: '/login' });
        }

    }, [error,navigate]);
  return (
    <></>
  )
}
