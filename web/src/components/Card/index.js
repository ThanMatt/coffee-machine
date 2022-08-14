import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Card = ({ name, onClick }) => {
  return (
    <Box
      cursor="pointer"
      onClick={onClick}
      borderWidth={1}
      borderRadius="16px"
      margin="6px"
    >
      <Box p={6}>
        <Box mt="1" maxWidth="100px" noOfLines={1}>
          {name}
        </Box>
      </Box>
    </Box>
  );
};

Card.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func
};

Card.defaultProps = {
  description: '',
  onClick: () => {}
};

export default Card;
