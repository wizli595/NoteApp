import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { getNoteById } from "../Api/noteApi";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Card } from "react-bootstrap";
import { formatDistanceToNow, parseISO } from "date-fns";

const NotePage = () => {
  const { noteId } = useParams({ from: "/note/$noteId" });
  const {
    data: note,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Note", noteId],
    queryFn: () => getNoteById(noteId),
  });
  return (
    <>
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
        </Card>
      ) : (
        <Message variant="info">No note found.</Message>
      )}
    </>
  );
};

export default NotePage;
