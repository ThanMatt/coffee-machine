import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Card = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      cursor="pointer"
      borderWidth={1}
      borderRadius="16px"
      margin="6px"
    >
      <Box p={6}>
        <p>+ Add item</p>
      </Box>
    </Box>
  );
};

Card.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Card;
