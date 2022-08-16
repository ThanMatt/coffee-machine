import { Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Card, AddItem } from '..';
import { useNavigate } from 'react-router-dom';

const Section = ({ sectionName, items }) => {
  const navigate = useNavigate();
  const type = sectionName === 'Products' ? '/product' : '/category';

  return (
    <div>
      <Text fontSize="xl" mb="16px">
        {sectionName}
      </Text>
      <Flex alignContent="flex-start" flexWrap="wrap">
        <AddItem
          label="+ Add category"
          onClick={() => navigate(`${type}/new`)}
        />
        {items.map((item) => {
          return (
            <Card
              onClick={() => navigate(`${type}/${item._id}`)}
              key={item._id}
              name={item.name}
              description={item.description}
            />
          );
        })}
      </Flex>
    </div>
  );
};

Section.propTypes = {
  sectionName: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
};

export default Section;
