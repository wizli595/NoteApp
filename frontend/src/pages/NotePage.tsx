import { useQuery } from "@tanstack/react-query";
import {  useRouter, useParams, Link } from "@tanstack/react-router";
import { IoIosArrowBack } from "react-icons/io";
import { getNoteById } from "../Api/noteApi";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Card } from "react-bootstrap";
import { formatDistanceToNow, parseISO } from "date-fns";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../app/hooks/useAuth";

const NotePage = () => {
  const { noteId } = useParams({ from: "/note/$noteId" });
  const {history,navigate} = useRouter();
  const {isAuthenticated,user}=useAuth();
  const {
    data: note,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Note", noteId],
    queryFn: () => getNoteById(noteId),
  });
  const handleSuppression = () => {
    const confirmation = confirm("to delete note go to /profile and delete it.");
    if (confirmation) {
      navigate({to:"/profile"});
    }
  }
  return (
    <>
      <Button  className="m-4" onClick={()=>{
        history.back();
      }}>
        <IoIosArrowBack /> Go Back 
      </Button>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          <strong>Opss! {error.name} :</strong>
          {error.message}
        </Message>
      ) : note ? (
        <Card className="m-4">
          <Card.Body>
            <Card.Title>{note.title}</Card.Title>
            <Card.Text>{note.text || "No additional text provided."}</Card.Text>
            <Card.Subtitle className="mb-2 text-muted">
              Created :{" "}
              {formatDistanceToNow(parseISO(note.createdAt.toLocaleString()))}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Updated :{" "}
              {formatDistanceToNow(parseISO(note.updatedAt.toLocaleString()))}
            </Card.Subtitle>
          </Card.Body>
          {isAuthenticated  &&  user?.id === note.userId && (
         <Card.Footer className="d-flex justify-content-between p-3">
         <Button variant="success" className="flex-grow-1 me-2 btn-sm">
             <Card.Link as={Link} to={"/note/"+note.id+"/edit"} className="text-white text-decoration-none">
                 <FaEdit style={{marginBottom:"5px"}}/> Edit Note
             </Card.Link>
         </Button>
         <Button variant="danger" className="flex-grow-1 ms-2 btn-sm" onClick={handleSuppression}>
             <Card.Link  className="text-white text-decoration-none">
                <FaTrash  style={{marginBottom:"5px"}}/> Delete Note
             </Card.Link>
         </Button>
     </Card.Footer>

        )}
        </Card>
      ) : (
        <Message variant="info">No note found.</Message>
      )}
    </>
  );
};

export default NotePage;
