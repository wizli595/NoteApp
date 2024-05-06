import  { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const CreateNotePage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Title:', title);
        console.log('Content:', content);
    };

    return (
        <div>
            <h1>Create Note</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" value={title} onChange={handleTitleChange} />
                </Form.Group>

                <Form.Group controlId="formContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter content" value={content} onChange={handleContentChange} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </div>
    );
};

export default CreateNotePage;