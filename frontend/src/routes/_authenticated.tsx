import {  createFileRoute, redirect } from '@tanstack/react-router';
import AuthLayout from '../layout/AuthLayout';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context, location }) => {
    if (!context.authentication.isAuthenticated) {
      console.log('Authenticated route', context.authentication.isAuthenticated);
      throw redirect({
        to: '/login',
        search: {
          redirect: location.pathname + location.search, 
        },
      });
    }
    
  },
  component: AuthLayout ,
 
})
