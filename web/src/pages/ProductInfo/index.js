import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../config/axios';

const ProductInfo = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const params = useParams();
  console.log(params);
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/v1/product/${params.id}`);

        setProduct(response.data);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getProduct();
  }, []);

  return loading ? (
    <p>Loading</p>
  ) : (
    <div>
      <p>{product.name}</p>
      <p>
        Velit ipsum et minim laboris fugiat deserunt amet dolor reprehenderit.
        Dolor elit nulla aute officia Lorem. Ea incididunt esse eu deserunt
        ipsum sunt laborum excepteur fugiat cillum duis proident velit.
      </p>
    </div>
  );
};

export default ProductInfo;
