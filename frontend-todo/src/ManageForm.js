import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Col, Container, Row } from "react-bootstrap";

const ManageForm = () => {
  return (
    <>
      <Container>
        <Row>
          <Formik
            initialValues={{ title: "", list: "" }}  // Ensure this structure is correct
            validationSchema={Yup.object({
                title: Yup.string().required("Required"),
                list: Yup.string().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(values);
                setSubmitting(false); // Reset isSubmitting to false after submission
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Col md={5}>
                  <label htmlFor="title">Title</label>
                  <Field type="text" name="title" />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col md={5}>
                  <label htmlFor="list">List</label>
                  <Field type="text" name="list" />
                  <ErrorMessage
                    name="list"
                    component="div"
                    className="text-danger"
                  />
                </Col>
                <Col md={2}>
                  <Button type="submit" disabled={isSubmitting}>
                    Add
                  </Button>
                </Col>
              </Form>
            )}
          </Formik>
        </Row>
      </Container>
    </>
  );
};

export default ManageForm;
