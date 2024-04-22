import { useParams } from "@tanstack/react-router";

const NotePage = () => {
  const NoteId = useParams({ from: "/note/$noteId" });

  return <div>{NoteId.noteId}</div>;
};

export default NotePage;
