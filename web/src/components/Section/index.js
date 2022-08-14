import { Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { Card, AddItem } from '..';
import { useNavigate } from 'react-router-dom';

const Section = ({ sectionName, items }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>{sectionName}</h1>
      <Flex alignContent="flex-start" flexWrap="wrap">
        <AddItem onClick={() => navigate('/product/new')} />
        {items.map((item) => {
          return (
            <Card
              onClick={() =>
                navigate(
                  `${sectionName === 'Products' ? '/product' : '/category'}/${
                    item._id
                  }`
                )
              }
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
