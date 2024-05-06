import React, { Suspense } from 'react';
import { useAuth } from '../../app/hooks/useAuth'; 
import { useQuery } from '@tanstack/react-query';
import { getMyNotes } from '../../Api/noteApi';
import NotesList from '../../components/NotesList';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
const ProfilePage: React.FC = () => {
    const { user } = useAuth(); 
    const {data:myNotes,isError,isLoading,error}= useQuery({queryKey:["myNotes"], queryFn:()=>getMyNotes()});

    return (
      <div>
        <h1>Welcome, {user?.username}!</h1>
        <h2>Your Notes</h2>
        <Suspense fallback={<Loader />}>
          {isLoading ? (
            <Loader />
          ) : isError ? (
            <Message variant="danger">
              <strong>Opss! {error.name} :</strong>
              {error.message}
            </Message>
          ) : (
            <NotesList notes={myNotes!} />
          )}
        </Suspense>
      </div>
    );
};

export default ProfilePage;