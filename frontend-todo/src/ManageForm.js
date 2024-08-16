import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Col, Container, Row } from "react-bootstrap";
import { createTodo } from "./data-service/todoApi";

const ManageForm = () => {
  return (
    <>
      <Container>
        <Formik
          enableReinitialize
          initialValues={{ title: "", description: "" }} // Ensure this structure is correct
          validationSchema={Yup.object({
            title: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { resetForm }) => {
            try {
              const response = await createTodo(values);
              if (response.status === 201) {
                // Reset the form after successful creation
                resetForm();
              }
              console.log("response", response);
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
                  <Button type="submit">Add</Button>
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
