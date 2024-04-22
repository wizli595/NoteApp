import { Note } from "@prisma/client";
import { Row } from "react-bootstrap";
import NoteCard from "./NoteCard";
type Props = {
  notes: Note[];
};

const NotesList = ({ notes }: Props) => {
  return (
    <>
      <Row className="g-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </Row>
    </>
  );
};

export default NotesList;
