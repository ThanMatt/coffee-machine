import { useEffect, useState } from 'react';
import { Flex, Box, Button, Text, Image } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { Card, AddItem } from '../../components';

const ItemDetails = () => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const type = location.pathname.match(/[a-z]+/)[0];

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
  }, [location.pathname]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(`/v1${location.pathname}`);

      if (response) {
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return loading ? (
    <p>Loading</p>
  ) : (
    <Flex flexDirection="column">
      <Flex mb="16px">
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Flex>
      <Box bgColor="white" borderWidth="1px" borderRadius="16px">
        {item.type === 'Product' && item.image && (
          <Image
            borderTopRadius="16px"
            height="400px"
            width="700px"
            objectFit="cover"
            src={item?.image}
          />
        )}
        <Box p="16px">
          <Text fontSize="3xl">{item.name}</Text>
          {item.type === 'Product' && (
            <Text mb="16px" fontSize="xl">
              Category: {item.category?.name || 'Uncategorized'}
            </Text>
          )}
          <Text fontSize="xl">
            {item.description || 'No description available'}
          </Text>

          {type === 'category' && (
            <Box>
              <Text fontSize="xl" mt="16px" mb="16px">
                Products:{' '}
              </Text>
              <Flex flexWrap="wrap">
                <AddItem
                  label="+ Add Product"
                  onClick={() => navigate('/product/new')}
                />
                {!!item.products?.length &&
                  item.products.map((product) => {
                    return (
                      <Card
                        onClick={() => navigate(`/product/${product._id}`)}
                        key={product._id}
                        name={product.name}
                        image={product.image}
                      />
                    );
                  })}
              </Flex>
            </Box>
          )}
        </Box>
      </Box>
      <Flex mt="16px" justifyContent="flex-end">
        <Button mr="16px" onClick={handleDelete}>
          Delete
        </Button>
        <Button onClick={() => navigate(`${location.pathname}/edit`)}>
          Edit
        </Button>
      </Flex>
    </Flex>
  );
};

export default ItemDetails;
