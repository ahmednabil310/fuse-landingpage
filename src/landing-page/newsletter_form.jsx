import React, { useState } from "react";
import { object, string } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SignupSchema = object().shape({
  email: string().email(" ").required(""),
});

const NewsletterForm = () => {
  const [title, setTitle] = useState("");

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const { email } = values;
        const user = {
          accountAddress: email,
          email: email,
          provider: "HDWallet",
          subscribe: true,
          source: "Fuse.io",
          displayName: "Fuse.io",
        };

        try {
          const response = await fetch("https://studio.fuse.io/api/v2/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            referrerPolicy: "no-referrer",
            body: JSON.stringify(user),
          });

          if (response.status === 200) {
            setTitle("<span>Thank you will be in touch! &#127881;</span>");
            setTimeout(() => {
              setTitle("");
            }, 3000);
            setSubmitting(true);
          } else if (response.status === 500) {
            setTitle("<span>Something went wrong &#128078</span>");
            setTimeout(() => {
              setTitle("");
            }, 3000);
            setSubmitting(true);
          }

          resetForm({ email: "" });
        } catch (error) {
          resetForm({ email: "" });
          setTitle("<span>Something went wrong &#128078</span>");
          setTimeout(() => {
            setTitle("");
          }, 3000);
          setSubmitting(true);
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <Form className="newsletter__form ">
          <div className="title" dangerouslySetInnerHTML={{ __html: title }} />

          <Field
            type="email"
            className="newsletter__form__input"
            placeholder="*Insert email"
            name="email"
          ></Field>

          <ErrorMessage name="email">
            {(msg) => (
              <div className="newsletter__form__mobile-error">{msg}</div>
            )}
          </ErrorMessage>
          <button
            disabled={!dirty || isSubmitting}
            id="btn_submit"
            type="submit"
            className="newsletter__form__button"
          >
            Send
          </button>
          <ErrorMessage name="email">
            {(msg) => <div className="newsletter__form__error ">{msg}</div>}
          </ErrorMessage>
        </Form>
      )}
    </Formik>
  );
};

export default NewsletterForm;
