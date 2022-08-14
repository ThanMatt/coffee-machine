import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import axios from '../../config/axios';

const AddForm = () => {
  const location = useLocation();

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get('/v1/category');
      setCategories(response.data);
    };

    getCategories();
  }, []);
  return (
    <form>
      <Flex flexDirection="column">
        <FormControl isInvalid={errors.name}>
          <FormLabel>Product Name</FormLabel>
          <Input type="email" />
        </FormControl>

        <FormControl mt="16px" isInvalid={errors.category}>
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
        </FormControl>

        <FormControl mt="16px" isInvalid={errors.description}>
          <FormLabel>Product Description</FormLabel>
          <Textarea />
        </FormControl>

        <Flex mt="16px" justifyContent="flex-end">
          <Button>Submit</Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default AddForm;
