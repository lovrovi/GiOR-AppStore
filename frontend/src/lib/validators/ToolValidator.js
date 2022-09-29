import * as Yup from 'yup';

export const ToolSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3),
  description: Yup.string()
    .required('Description quantity is required')
    .max(100),
  price: Yup.number().required('Price is required').min(1),
  type: Yup.number().required('Type is required'),
  producerId: Yup.number().required('Producer is required'),
});
