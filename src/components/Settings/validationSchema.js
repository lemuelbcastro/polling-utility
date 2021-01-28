import * as yup from "yup";

const validationSchema = yup.object().shape({
  apiBase: yup.object().shape({
    url: yup
      .string()
      .url("Please provide a valid URL")
      .when(["enabled"], {
        is: true,
        then: yup.string().required("This field is required"),
      }),
    enabled: yup.bool(),
  }),
  auth: yup.object().shape({
    url: yup
      .string()
      .required("This field is required"),
    requestBody: yup
      .string()
      .test("isValidJson", "Please provide a valid JSON string", (value) => {
        try {
          let parsed = JSON.parse(value);

          if (parsed && typeof parsed === "object") {
            return true;
          }
        } catch (e) {}

        return false;
      })
      .required("This field is required"),
  }),
});

export default validationSchema;
