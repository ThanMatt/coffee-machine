import { Box, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const AddItem = ({ onClick, label }) => {
  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      borderWidth={1}
      borderRadius="16px"
      margin="6px"
      _hover={{
        background: '#f0f0f0'
      }}
    >
      <Flex p={6} height="100px" alignItems="center">
        <p>{label}</p>
      </Flex>
    </Box>
  );
};

AddItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default AddItem;
