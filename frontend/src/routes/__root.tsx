import {  createRootRouteWithContext } from "@tanstack/react-router";
import Layout from '../layout/Layout'
import { AuthHookReturnType } from "../app/hooks/useAuth";

type RouterContext = {
  authentication: AuthHookReturnType;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Layout />,
  wrapInSuspense: true,

});
