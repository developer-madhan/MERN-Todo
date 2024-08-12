import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Col, Container, Row } from "react-bootstrap";

const ManageForm = () => {
  return (
    <>
      <Container>
        <Formik
          initialValues={{ title: "", list: "" }} // Ensure this structure is correct
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
              <Row>
                <Col md={5}>
                  <Row>
                    <Col md={3}>
                      <label htmlFor="title"><strong>Title</strong></label>
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
                      <label htmlFor="list"><strong>List</strong></label>
                    </Col>
                    <Col md={9}>
                      <Field type="text" className="form-control" name="list" />
                    </Col>

                    <ErrorMessage
                      name="list"
                      component="div"
                      className="text-danger"
                    />
                  </Row>
                </Col>
                <Col md={2}>
                  <Button type="submit" disabled={isSubmitting}>
                    Add
                  </Button>
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
