import { useEffect, useMemo, useState } from 'react';
import {
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
  const [item, setItem] = useState({});

  const type = location.pathname.match(/[a-z]+/)[0];
  const isEdit = !!location.pathname.match(/edit/);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(
      type === 'product' ? productFormValidation : categoryFormValidation
    ),
    defaultValues:
      isEdit &&
      useMemo(() => {
        return {
          name: item.name,
          description: item.description,
          category: item.category?._id
        };
      }, [item])
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

    if (type === 'product') {
      getCategories();
    }
  }, []);

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(
          `/v1${location.pathname.replace(/\/edit/, '')}`
        );

        setItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (isEdit) {
      getItem();
    }
  }, []);

  useEffect(() => {
    if (type === 'product') {
      reset({
        name: item.name,
        description: item.description,
        category: item.category?._id
      });
    } else {
      reset({
        name: item.name,
        description: item.description
      });
    }
  }, [item]);

  const onSubmit = async (values) => {
    console.log(values);

    try {
      setLoading(true);

      if (isEdit) {
        let body;
        if (type === 'category') {
          body = {
            name: values.name,
            description: values.description
          };
        } else {
          body = {
            name: values.name,
            description: values.description,
            category: values.category
          };
        }
        await axios.put(`/v1${location.pathname.replace(/\/edit/, '')}`, body);
      } else {
        await axios.post(`/v1/${type}`, {
          ...values
        });
      }
      setLoading(false);
      navigate(-1);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Text>Create a new {type}</Text>
      <Flex flexDirection="column">
        <FormControl isInvalid={errors.name}>
          <FormLabel>Name</FormLabel>
          <Input type="text" {...register('name')} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        {type === 'product' && (
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
            <FormErrorMessage>
              {errors.category && errors.category.message}
            </FormErrorMessage>
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
