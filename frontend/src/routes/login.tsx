import { createFileRoute, redirect} from "@tanstack/react-router";
import LoginPage from "../pages/LoginPage";

export const Route = createFileRoute("/login")({
  component: () => <LoginPage />,
  pendingComponent: () => <div>Loading...</div>, 
  beforeLoad: ({ context }) => {
    if (context?.authentication.isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  
});
