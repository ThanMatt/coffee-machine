import * as yup from 'yup';

const productSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Product name must be at least two characters long')
    .required('Product name is required'),
  category: yup.string().required('Product category is required'),
  description: yup
    .string()
    .min(2, 'Product description must be at least two characters long')
});

export default productSchema;
