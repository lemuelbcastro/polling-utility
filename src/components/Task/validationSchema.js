import * as yup from "yup";

const validationSchema = yup.object().shape({
  title: yup.string().required("This field is required"),
  request: yup.object().shape({
    url: yup.string().required("This field is required"),
    method: yup.string().required("This field is required"),
  }),
  refreshRate: yup
    .number()
    .positive("Please provide a valid number")
    .required("This field is required")
    .typeError("This field is required"),
});

export default validationSchema;
