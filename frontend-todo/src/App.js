import { Container, Card, Button, Col, Row } from "react-bootstrap";
import "./App.css";
import ManageForm from "./ManageForm";
import { useEffect, useState } from "react";
import { deleteTodo, getAllTodo } from "./data-service/todoApi";

function App() {
  const [todoLists, setTodolists] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllTodo();
      setTodolists(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = (id) => {
    console.log("handleDone", id);
  };

  const handleEdit = (id) => {
    console.log("handleEdit", id);
  };

  const handleDelete = async (id) => {
    console.log("handleDelete", id);
    try {
      const res = await deleteTodo(id);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Row className="my-2">
          <Col lg={12} className="text-center">
            <h1>Welcome to my Todo App</h1>
          </Col>
        </Row>

        <Row className="my-2">
          <ManageForm />
        </Row>

        <Row className="my-2">
          {todoLists.map((todoList, idx) => (
            <Col md={4} className="my-2" key={idx}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>{todoList.title}</Card.Title>
                    <Button
                      type="button"
                      onClick={() => handleDone(todoList._id)}
                      className="me-2"
                    >
                      Done
                    </Button>
                  </div>
                  <Card.Text >{todoList.description}</Card.Text>
                  <Button
                    type="button"
                    onClick={() => handleEdit(todoList._id)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleDelete(todoList._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default App;
