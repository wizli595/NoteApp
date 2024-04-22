import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "../Api/noteApi";
import NotesList from "../components/NotesList";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomePage = () => {
  const {
    data: notes,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Notes"],
    queryFn: getAllNotes,
  });

  return (
    <>
      <h1 className="m-4">All Notes</h1>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          <strong>Opss! {error.name} :</strong>
          {error.message}
        </Message>
      ) : (
        <NotesList notes={notes!} />
      )}
    </>
  );
};

export default HomePage;
