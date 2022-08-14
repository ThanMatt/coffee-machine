import * as yup from 'yup';

const categorySchema = yup.object({
  name: yup
    .string()
    .min(2, 'Category name must be at least two characters long')
    .required('Category name is required'),
  description: yup
    .string()
    .min(2, 'Category description must be at least two characters long')
});

export default categorySchema;
