import { useMutation } from '@tanstack/react-query';
import  { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createNote, NoteData } from '../../../Api/noteApi';
import { formatError } from '../../../utils/formatError';
import { useNavigate, useRouter } from '@tanstack/react-router';



const CreateNotePage: React.FC = () => {
    const [noteData, setNoteData] = useState<NoteData>({ title: '', text: '' });
    const navigate = useNavigate();
    const {history}=useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNoteData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

   const {mutate:create,isPending}= useMutation({
       mutationFn:createNote,
       onSuccess:()=>{
           toast.success('Note created successfully');
           navigate({to:'/'});
       },
       onError:(err:unknown)=>{
           formatError(err);
       }
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(noteData);
        create(noteData);
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
        <h1>Create Note</h1>
        <Form onSubmit={handleSubmit} className="">
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={noteData.title}
              onChange={handleChange}
              className="w-50"
            />
          </Form.Group>

          <Form.Group controlId="formContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter content"
              name="text"
              value={noteData.text}
              onChange={handleChange}
              className="w-50"
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={isPending}
            className="mt-2"
          >
            Create
          </Button>
        </Form>
      </div>
    );
};

export default CreateNotePage;