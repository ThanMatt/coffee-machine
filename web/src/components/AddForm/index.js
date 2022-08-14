import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../../config/axios';

const AddForm = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get('/v1/category');
      setCategories(response.data);
    };

    getCategories();
  }, []);
  return (
    <Box>
      <FormControl>
        <FormLabel>Product Name</FormLabel>
        <Input type="email" />
        <FormLabel>Product Category</FormLabel>
        <Select placeholder="Select a product category">
          {categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </Select>
        <FormLabel>Product Description</FormLabel>
        <Textarea />
      </FormControl>
    </Box>
  );
};

export default AddForm;