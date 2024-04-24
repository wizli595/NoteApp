import { Col, Container, Row } from "react-bootstrap";

type Props = {
  children: React.ReactNode;
};

const FormContainer: React.FC<Props> = ({ children }) => {
  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center text-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
