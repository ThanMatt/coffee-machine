import { useEffect, useState } from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import axios from '../../config/axios';
import { Section } from '../../components';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getProductsAndCategories = async () => {
      setLoading(true);
      const productUrl = axios.get('/v1/product');
      const categoryUrl = axios.get('/v1/category');

      const [productsResponse, categoriesResponse] = await Promise.all([
        productUrl,
        categoryUrl
      ]);

      setProducts(productsResponse.data);
      setCategories(categoriesResponse.data);
      setLoading(false);
    };

    getProductsAndCategories();
  }, []);

  return (
    <Box padding="24px">
      <Text fontSize="3xl" fontWeight="bold" mb="16px">
        Welcome to coffee machine
      </Text>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Flex flexDirection="column">
          <Section
            sectionName="Categories"
            type="category"
            items={categories}
          />
        </Flex>
      )}
    </Box>
  );
};

export default Home;
