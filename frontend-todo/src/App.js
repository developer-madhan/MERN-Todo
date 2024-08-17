import { Container, Card, Button, Col, Row } from "react-bootstrap";
import "./App.css";
import ManageForm from "./ManageForm";
import { useEffect, useState } from "react";
import { deleteTodo, getAllTodo, updateTodo } from "./data-service/todoApi";

function App() {
  const [todoLists, setTodolists] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getAllTodo();
      setTodolists(response || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = async (id) => {
    // console.log("handleDone", id);
    try {
      // Find the todo item by id
      const updatedTodo = todoLists.find(todo => todo._id === id);
      if (updatedTodo) {
        // Toggle the isDone status
        const updatedStatus = { ...updatedTodo, isDone: !updatedTodo.isDone };
  
        // Send the updated status to the backend
        await updateTodo(id, updatedStatus);
  
        // Update the local state
        setTodolists(todoLists.map(todo =>
          todo._id === id ? updatedStatus : todo
        ));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    console.log("handleEdit", id);
  };

  const handleDelete = async (id) => {
    // console.log("handleDelete", id);
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
                    <Card.Title className={todoList.isDone ? "text-decoration-line-through" : ""}>{todoList.title}</Card.Title>
                    <Button
                      type="button"
                      onClick={() => handleDone(todoList._id)}
                      className="me-2"
                    >
                      Done
                    </Button>
                  </div>
                  <Card.Text className={todoList.isDone ? "text-decoration-line-through" : ""} >{todoList.description}</Card.Text>
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
