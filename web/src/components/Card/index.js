import { Box, Image, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Card = ({ name, onClick, image }) => {
  return (
    <Box
      cursor="pointer"
      onClick={onClick}
      borderWidth={1}
      borderRadius="16px"
      margin="6px"
      _hover={{
        background: '#f0f0f0'
      }}
    >
      {!!image ? (
        <>
          {' '}
          <Image
            borderTopRadius={6}
            src={image}
            height="50px"
            width="150px"
            objectFit="cover"
          />
          <Box p={4}>
            <Box mt="1" maxWidth="100px" noOfLines={1}>
              {name}
            </Box>
          </Box>
        </>
      ) : (
        <Flex p={4} alignItems="center" height="100px">
          <Box mt="1" maxWidth="100px" noOfLines={2}>
            {name}
          </Box>
        </Flex>
      )}
    </Box>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func,
  image: PropTypes.string
};

Card.defaultProps = {
  description: '',
  onClick: () => {},
  image: ''
};

export default Card;
