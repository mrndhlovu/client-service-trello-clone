import * as yup from "yup"

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

export const PASSWORD_VALIDATION = yup
  .string()
  .required("Required field")
  .min(6)

export const NUMBER_VALIDATION = yup.number().min(1)

export const BOOLEAN_VALIDATION = yup.bool()

export const EMAIL_VALIDATION = yup
  .string()
  .email("Invalid email")
  .required("Required field")

const PHONE_VALIDATION = yup
  .string()
  .matches(phoneRegExp, "Phone number is not valid")
  .min(7)

const USERNAME_VALIDATION = yup.string().min(4).required("Required field")
// const TEXT_VALIDATION_NOT_REQUIRED = yup.string().min(2)

export const CUSTOM_DONATION_VALIDATION = yup.number().min(5)

const NAME_VALIDATION = yup
  .string()
  .min(2, "Too Short!")
  .max(70, "Too Long!")
  .required("Required field")

export const PHONE_FORM_VALIDATION = yup.object({
  phone: PHONE_VALIDATION,
})

export const NAME_FORM_VALIDATION = yup.object({
  name: NAME_VALIDATION,
})

export const EMAIL_FORM_VALIDATION = yup.object({
  email: EMAIL_VALIDATION,
  name: NAME_VALIDATION,
})

export const EMAIL_ONLY_VALIDATION = yup.object({
  email: EMAIL_VALIDATION,
})

export const FORM_VALIDATION = {
  REGISTER: yup.object({
    email: NAME_VALIDATION,
    username: USERNAME_VALIDATION,
    password: PASSWORD_VALIDATION,
  }),
  LOGIN: yup.object({
    identifier: EMAIL_VALIDATION | USERNAME_VALIDATION,
    password: PASSWORD_VALIDATION,
  }),
}

export const CONFIRM_PASSWORD_VALIDATION = yup.object({
  password: PASSWORD_VALIDATION,
  confirm_password: PASSWORD_VALIDATION,
})

export const CHANGE_PASSWORD_VALIDATION = yup.object({
  password: PASSWORD_VALIDATION,
})
