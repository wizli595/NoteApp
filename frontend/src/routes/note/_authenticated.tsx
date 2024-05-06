import {  createFileRoute, redirect } from '@tanstack/react-router';


export const Route = createFileRoute('/note/_authenticated')({
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

 
})
