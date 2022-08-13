import { useEffect, useState } from 'react';
import axios from '../../config/axios';

const ProductInfo = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const getProduct = async () => {
      axios.get('');
    };
  }, []);

  return <p>Loading</p>;
};

export default ProductInfo;
