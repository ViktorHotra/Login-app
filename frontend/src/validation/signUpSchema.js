import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    // email: yup.string().email('Please enter a valid email address').required('Please enter your email'),
    email: yup.string().required('Please enter your email'),
    password: yup
        .string()
        .required('Please enter your password')
        .length(3, 'Password must be at least 3 characters long'),
    confirm: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], `Passwords don't match`),
    isSober: yup.bool(),
});
