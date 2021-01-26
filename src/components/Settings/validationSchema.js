import * as yup from "yup";

const validationSchema = yup.object().shape({
  apiBase: yup.object().shape({
    url: yup
      .string()
      .url("Please provide a valid URL")
      .when(['enabled'], {
        is: true,
        then: yup.string().required("This field is required"),
      }),
    enabled: yup.bool(),
  }),
  auth: yup.object().shape({
    url: yup
      .string()
      .url("Please provide a valid URL")
      .required("This field is required"),
    username: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
  }),
});

export default validationSchema;
