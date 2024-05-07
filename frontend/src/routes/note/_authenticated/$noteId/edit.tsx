import { createFileRoute } from '@tanstack/react-router'
import { getNoteById } from '../../../../Api/noteApi';
import EditNotePage from '../../../../pages/private/note/EditNotePage';



export const Route = createFileRoute('/note/_authenticated/$noteId/edit')({
  loader:async ({params})=>{
    const {noteId} = params;
    const note = await getNoteById(noteId);
    return {
      note
    }
  },
  component: EditNotePage,
})

