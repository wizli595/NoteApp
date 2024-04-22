import { Note } from "@prisma/client";
import { Card, Col } from "react-bootstrap";
import styles from "../assets/global.module.css";

type Props = {
  note: Note;
};

const NoteCard = ({ note }: Props) => {
  return (
    <Col sm={12} md={6} lg={4}>
      <Card className={styles.Slate}>
        <Card.Body>
          <Card.Title>{note.title}</Card.Title>
          <Card.Text>{note.text || "No additional text provided."}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            Created: {new Date(note.createdAt).toLocaleDateString()}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Updated: {new Date(note.updatedAt).toLocaleDateString()}
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NoteCard;
