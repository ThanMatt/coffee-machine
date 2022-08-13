import { useEffect, useState } from 'react';
import axios from '../../config/axios';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const getProductsAndCategories = async () => {
      setLoading(true);
      const response = await axios.get('/v1/product');
      console.log(response);

      setProducts(response.data);
      setCategories([]);
      setLoading(false);
    };

    getProductsAndCategories();
  }, []);
  return (
    <div>
      <p>Welcome to coffee machine</p>
      {loading ? (
        <p>Loading...</p>
      ) : (
        products.map((product, index) => {
          return <p key={index}>{product.name}</p>;
        })
      )}
    </div>
  );
};

export default Home;
