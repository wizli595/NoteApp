import {  createRootRouteWithContext } from "@tanstack/react-router";
import Layout from '../layout/Layout'
import { AuthContext } from "../hooks/useAuth";

type RouterContext = {
  authentication: AuthContext;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad:({context})=>{console.log(context)},
  component: () => <Layout />
});
