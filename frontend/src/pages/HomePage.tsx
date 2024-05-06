import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "../Api/noteApi";
import NotesList from "../components/NotesList";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Col, Container, Row } from "react-bootstrap";
import { IoCreateOutline } from "react-icons/io5";
import { Link } from "@tanstack/react-router";

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
      <Container className="my-4">
        <Row>
          <Col xs={12} md={8} className="d-flex align-items-center">
            <h1 className="mb-0">All Notes</h1>
          </Col>
          <Col xs={12} md={4} className="text-md-right mt-3 mt-md-0">
            <Button variant="secondary" >
              <Link to="/note/create" className="text-white text-decoration-none" as="/note/create">
                <IoCreateOutline style={{marginBottom:"3px"}}/> Create Note
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
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
