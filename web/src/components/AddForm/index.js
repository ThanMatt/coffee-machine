import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  productFormValidation,
  categoryFormValidation
} from '../../validators';
import axios from '../../config/axios';

const AddForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const item = location.pathname.match(/[a-z]+/)[0];

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      item === 'product' ? productFormValidation : categoryFormValidation
    )
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('/v1/category');
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (item === 'product') {
      getCategories();
    }
  }, []);

  const onSubmit = async (values) => {
    console.log(values);

    try {
      setLoading(true);
      await axios.post(`/v1/${item}`, {
        ...values
      });

      navigate('/');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text>Create a new {item}</Text>
      <Flex flexDirection="column">
        <FormControl isInvalid={errors.name}>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...register('name')} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        {item === 'product' && (
          <FormControl mt="16px" isInvalid={errors.category}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select a product category"
              {...register('category')}
            >
              {categories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        )}

        <FormControl mt="16px" isInvalid={errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea {...register('description')} />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>

        <Flex mt="16px" justifyContent="flex-end">
          <Button type="submit" isLoading={loading}>
            Submit
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default AddForm;
