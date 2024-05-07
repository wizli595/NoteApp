import  { useState } from 'react';
import { NoteData, updateNote } from '../../../Api/noteApi';
import { Button, Form } from 'react-bootstrap';
import { Route } from '../../../routes/note/_authenticated/$noteId/edit';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { formatError } from '../../../utils/formatError';
import { LiaEditSolid } from "react-icons/lia";
import { useRouter } from '@tanstack/react-router';



const EditNotePage: React.FC = () => {
    const {note:oldNote}= Route.useLoaderData();
    const navigate = Route.useNavigate();
    const {history}=useRouter();
    const [note, setNote] = useState<NoteData>({
        title: oldNote.title || '',
        text: oldNote.text || ''
    });


    const {mutate:editNote,isPending}=useMutation({
        mutationFn:updateNote,
        onSuccess:()=>{
            console.log('Note updated successfully');
            navigate({to:'/note/'+oldNote.id});
            toast.success('Note updated successfully');
        },
        onError:(err:unknown)=>{
            formatError(err);
        }
    });
   

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNote((prevNote) => ({
            ...prevNote,
            [name]: value,
        }));
    };

    

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Handle form submission logic here
        console.log(note);
        editNote({ id: oldNote.id, noteData: note });
    };


    return (
        <div>
          <Button
          variant="secondary"
          onClick={() => history.back()}
          className="my-4"
        >
          Go Back
        </Button>
        <h1> <LiaEditSolid /> Edit Note</h1>
        <Form onSubmit={handleSubmit} className=''>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name='title'
              value={note.title}
              onChange={handleChange}
              className='w-50'
            />
          </Form.Group>

          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter content"
              name='text'
              value={note.text}
              onChange={handleChange}
              className='w-50'
            />
          </Form.Group>

          <Button 
            variant="primary"
            type="submit"
            disabled={isPending}
            className='mt-2'
            >
            Edit
          </Button>
        </Form>
      </div>
    );
};

export default EditNotePage;