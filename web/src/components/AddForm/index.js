import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
  Textarea,
  useToast
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDropzone } from 'react-dropzone';

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
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const onDrop = useCallback((files) => {
    setFile(files[0]);
    setFileName(files[0].name);
  });

  const toast = useToast();

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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

  useEffect(() => {
    let objectUrl;
    if (file) {
      objectUrl = URL.createObjectURL(file);
      console.log(objectUrl);
      setImagePreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [file]);

  const onSubmit = async (values) => {
    let formData;

    if (file) {
      formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);
    }

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
        if (formData) {
          const response = await axios.put('/v1/product/upload', formData);
          await axios.put(`/v1${location.pathname.replace(/\/edit/, '')}`, {
            ...body,
            image: response.data.image
          });
        } else {
          await axios.put(
            `/v1${location.pathname.replace(/\/edit/, '')}`,
            body
          );
        }
        toast({
          title: `${type} updated.`,
          status: 'success',
          duration: 3000,
          isClosable: true
        });
      } else {
        if (formData) {
          const response = await axios.put('/v1/product/upload', formData);

          await axios.post(`/v1/${type}`, {
            ...values,
            image: response.data.image
          });
        } else {
          await axios.post(`/v1/${type}`, {
            ...values
          });
        }
        toast({
          title: `${type} created.`,
          status: 'success',
          duration: 3000,
          isClosable: true
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
      <Button mb="16px" onClick={() => navigate(-1)}>
        Go Back
      </Button>
      <Text fontSize="2xl" fontWeight="bold" mb="16px">
        {isEdit ? `Update a ${type}` : `Create a new ${type}`}
      </Text>
      <Flex flexDirection="column">
        <FormControl isInvalid={errors.name}>
          <FormLabel>Name</FormLabel>
          <Input bgColor="white" type="text" {...register('name')} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        {type === 'product' && (
          <FormControl mt="16px" isInvalid={errors.category}>
            <FormLabel>Category</FormLabel>
            <Select
              bgColor="white"
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

        {type === 'product' && (
          <FormControl mt="16px" isInvalid={errors.description}>
            <Box
              {...getRootProps()}
              bgColor="white"
              width="300px"
              borderWidth={1}
              borderRadius="6px"
            >
              <Flex
                flexDirection="column"
                height="300px"
                alignItems="center"
                justifyContent="center"
              >
                <input {...getInputProps()} />
                {!!imagePreview && (
                  <Image
                    src={imagePreview}
                    objectFit="contain"
                    height="200px"
                    width="200px"
                  />
                )}
                <Button>
                  {!!imagePreview ? 'Select again' : 'Select an image'}
                </Button>
              </Flex>
            </Box>
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
        )}

        <FormControl mt="16px" isInvalid={errors.description}>
          <FormLabel>Description</FormLabel>
          <Textarea {...register('description')} bgColor="white" />
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
