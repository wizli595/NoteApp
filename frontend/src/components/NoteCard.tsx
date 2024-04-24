import { Note } from "@prisma/client";
import { Card, Col } from "react-bootstrap";
import styles from "../assets/global.module.css";
import { Link } from "@tanstack/react-router";
import { formatDistanceToNow, parseISO } from "date-fns";

type Props = {
  note: Note;
};

const NoteCard = ({ note }: Props) => {
  const update_date = formatDistanceToNow(
    parseISO(note.updatedAt.toLocaleString())
  );
  const create_date = formatDistanceToNow(
    parseISO(note.createdAt.toLocaleString())
  );
  return (
    <Col sm={12} md={6} lg={4}>
      <Card className={styles.Slate}>
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.text || "No additional text provided."}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            Created: {create_date}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Updated: {update_date}
          </Card.Subtitle>
          <Card.Link as={Link} to={"/note/" + note.id}>
            Read more...
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NoteCard;
