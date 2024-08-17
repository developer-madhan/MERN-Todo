import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Col, Container, Row } from "react-bootstrap";
import { createTodo, updateTodo } from "./data-service/todoApi";

const ManageForm = ({ todo, onSave }) => {
  // Determine initial values based on whether we're editing or creating
  const initialValues = todo
    ? { title: todo.title, description: todo.description }
    : { title: "", description: "" };

  return (
    <>
      <Container>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object({
            title: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            try {
              if (todo) {
                // Edit existing todo
                await updateTodo(todo._id, values);
              } else {
                // Create new todo
                await createTodo(values);
              }
              // Call the onSave callback to refetch data or reset form state
              onSave();
              resetForm();
            } catch (error) {
              console.error("error", error);
            }
          }}
        >
          {() => (
            <Form>
              <Row>
                <Col md={5}>
                  <Row>
                    <Col md={3}>
                      <label htmlFor="title">
                        <strong>Title</strong>
                      </label>
                    </Col>
                    <Col md={9}>
                      <Field
                        type="text"
                        className="form-control"
                        name="title"
                      />
                    </Col>
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger"
                    />
                  </Row>
                </Col>
                <Col md={5}>
                  <Row>
                    <Col md={3}>
                      <label htmlFor="description">
                        <strong>Description</strong>
                      </label>
                    </Col>
                    <Col md={9}>
                      <Field
                        type="text"
                        className="form-control"
                        name="description"
                      />
                    </Col>
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-danger"
                    />
                  </Row>
                </Col>
                <Col md={2}>
                  <Button type="submit">{todo ? "Update" : "Add"}</Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default ManageForm;
