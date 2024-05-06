import { Note } from "@prisma/client";
import { Button, Card, Col } from "react-bootstrap";
import styles from "../assets/global.module.css";
import { Link } from "@tanstack/react-router";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useAuth } from "../app/hooks/useAuth";
import {FaEdit,FaTrash} from 'react-icons/fa'


type Props = {
  note: Note;
};

const NoteCard = ({ note }: Props) => {
  const {isAuthenticated,user}=useAuth();

  const update_date = formatDistanceToNow(
    parseISO(note.updatedAt.toLocaleString())
  );
  const create_date = formatDistanceToNow(
    parseISO(note.createdAt.toLocaleString())
  );
  return (
    <Col sm={12} md={6} lg={4} className="mb-4">
      <Card  className={`${styles.Slate} h-100`}>
        <Card.Body >
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.text || "No additional text provided."}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted small">
            Created: {create_date}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted small">
            Updated: {update_date}
          </Card.Subtitle>
          
          <Card.Link as={Link} to={"/note/"+note.id} className={styles.readMore}>
            Read more...
          </Card.Link>
        </Card.Body>
        {isAuthenticated && user?.id === note.userId && (
         <Card.Footer className="d-flex justify-content-between p-3">
         <Button variant="success" className="flex-grow-1 me-2 btn-sm">
             <Card.Link as={Link} to={"/note/"+note.id+"/edit"} className="text-white text-decoration-none">
                 <FaEdit style={{marginBottom:"5px"}}/> Edit Note
             </Card.Link>
         </Button>
         <Button variant="danger" className="flex-grow-1 ms-2 btn-sm">
             <Card.Link as={Link} to={"/note/"+note.id+"/delete"} className="text-white text-decoration-none">
                <FaTrash  style={{marginBottom:"5px"}}/> Delete Note
             </Card.Link>
         </Button>
     </Card.Footer>

        )}
      </Card>
    </Col>
  );
};

export default NoteCard;
