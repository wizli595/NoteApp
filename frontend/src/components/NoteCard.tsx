import { Note } from "@prisma/client";
import { Button, Card, Col } from "react-bootstrap";
import styles from "../assets/global.module.css";
import { Link, useRouter } from "@tanstack/react-router";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useAuth } from "../app/hooks/useAuth";
import {FaEdit,FaTrash} from 'react-icons/fa'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../Api/noteApi";
import { toast } from "react-toastify";
import { formatError } from "../utils/formatError";


type Props = {
  note: Note;
};

const NoteCard = ({ note }: Props) => {
  const {isAuthenticated,user}=useAuth();
  const queryClient=useQueryClient();

  const update_date = formatDistanceToNow(
    parseISO(note.updatedAt.toLocaleString())
  );
  const create_date = formatDistanceToNow(
    parseISO(note.createdAt.toLocaleString())
  );
  const {history:{location}}=useRouter();

  const {mutate,isPending}=useMutation({
    mutationFn:deleteNote,
    onSuccess:()=>{
      console.log("Note Deleted");
      queryClient.invalidateQueries({ queryKey: ["myNotes"] });
      toast.success("Note Deleted Successfully");
    },
    onError:(err:unknown)=>{
      console.error(err);
      formatError(err);
    }

  });
  const handelDelete=()=>{
    const confirmation=confirm("Are you sure you want to delete this note?");
    if(confirmation){
      
      mutate(note.id);
    }
  };
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
             <Card.Link as={Link} to={"/note/"+note.id+"/edit"} className="text-white text-decoration-none">
                <Button variant="success" className="flex-grow-1 me-2 btn-sm">
                        <FaEdit style={{marginBottom:"5px"}}/> Edit Note
                </Button>
             </Card.Link>
          {
            location.pathname === "/profile" && (
              <Button 
                variant="danger"
                className="flex-grow-1 ms-2 btn-sm"
                onClick={handelDelete}
                disabled={isPending}
                >
              <Card.Link  className="text-white text-decoration-none">
                 <FaTrash  style={{marginBottom:"5px"}}/> Delete Note
              </Card.Link>
            </Button>
            )
          }
         
     </Card.Footer>

        )}
      </Card>
    </Col>
  );
};

export default NoteCard;
