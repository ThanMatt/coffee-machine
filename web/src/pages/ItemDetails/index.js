import { Flex, Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from '../../config/axios';

const ItemDetails = () => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    const getItem = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/v1${location.pathname}`);
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getItem();
  }, []);

  return loading ? (
    <p>Loading</p>
  ) : (
    <Flex flexDirection="column">
      <Box borderWidth="1px" borderRadius="16px">
        <Box p="16px">
          <p>{item.name}</p>
          <p>
            {item.type === 'Product' && (
              <p>Category: {item.category?.name || 'Uncategorized'}</p>
            )}
          </p>
          <p>
            Velit ipsum et minim laboris fugiat deserunt amet dolor
            reprehenderit. Dolor elit nulla aute officia Lorem. Ea incididunt
            esse eu deserunt ipsum sunt laborum excepteur fugiat cillum duis
            proident velit.
          </p>
        </Box>
      </Box>
    </Flex>
  );
};

export default ItemDetails;
