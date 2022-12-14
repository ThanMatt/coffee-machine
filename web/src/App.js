import { Routes, Route } from 'react-router-dom';
import { Home, ItemDetails } from './pages';
import { Flex, Center, Box } from '@chakra-ui/react';
import { AddForm } from './components';

function App() {
  return (
    <Flex bgColor="#ffdab3" minHeight="100vh" justifyContent="center">
      <Center>
        <Box width="700px">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:id/edit" element={<AddForm />} />
            <Route path="/product/:id/edit" element={<AddForm />} />
            <Route path="/category/new" element={<AddForm />} />
            <Route path="/product/new" element={<AddForm />} />
            <Route path="/product/:id" element={<ItemDetails />} />
            <Route path="/category/:id" element={<ItemDetails />} />
          </Routes>
        </Box>
      </Center>
    </Flex>
  );
}

export default App;
