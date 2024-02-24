import * as Yup from "yup";

export let productValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .max(50, "Title must be within 50 characters.")
    .required("Title is required."),
  description: Yup.string()
    .trim()
    .max(150, "Description must be within 150 characters.")
    .required("Description is required."),
});
