import * as Yup from "yup";

   export const validationSchemas = [
    Yup.object({
      firstName: Yup.string().required("First name is required"),
      email: Yup.string(),
      password: Yup.string(),
    }),
    Yup.object({
      firstName: Yup.string(),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string(),
    }),
    Yup.object({
      firstName: Yup.string(),
      email: Yup.string(),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
  ];