import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const signupSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  division_id: yup.number().required(),
  phone_number: yup.string().required(),
  telegram_username: yup.string().nullable(),
  birth_date: yup.date().required(),
  expected_graduation_year: yup.number().required(),
  year: yup.number().min(1).max(6).required(),
  university_department: yup.string().required(),
  specialty: yup.string().required(),
});
