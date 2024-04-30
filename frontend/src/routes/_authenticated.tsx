import { createFileRoute } from '@tanstack/react-router'
import Loader from '../components/Loader';
import {Error as ErrorFC} from '../components/Error';

export const Route = createFileRoute('/_authenticated')({

  beforeLoad:async ({context,navigate}) => {
    const {isLogged}= context.authentication;
    console.log('isLogged',isLogged());
    // Check if the user is logged in
    if (!isLogged()) {
      await navigate({ to: '/login' });
      throw new Error('Not logged in' as string);
      // return new Promise((_, reject) => setTimeout(reject, 0));
    }
  },  
  pendingComponent:()=>(<Loader />),
  
  errorComponent: (error ) => {
    return (
      <ErrorFC error={error} />
    );
  }, 
})
