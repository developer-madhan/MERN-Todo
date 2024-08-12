import { Container, Card, Button, Col, Row } from "react-bootstrap";
import "./App.css";
import ManageForm from "./ManageForm";

function App() {
  const handleEdit = () => {
    console.log("handleEdit");
  };

  const handleDelete = () =>{
    console.log('handleDelete');
  }

  return (
    <>
      <Container>
        <Row className="my-2">
          <Col lg={12} className="text-center">
            <h1>Welcome for my Todo App</h1>
          </Col>
        </Row>

        <Row className="my-2">
          <ManageForm/>
        </Row>
        
        <Row className="my-2">
          <Col md={4} className="m-2">
            <Card>
              <Card.Body>
                <Card.Title>Card Title</Card.Title>

                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>

                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button type="button" onClick={handleEdit} className="me-2">
                  Edit
                </Button>
                <Button type="button" onClick={handleDelete} > Delete </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
