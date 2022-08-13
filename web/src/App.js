import { Routes, Route } from 'react-router-dom';
import { Home } from './pages';
import { Flex, Center } from '@chakra-ui/react';

function App() {
  return (
    <Flex minHeight="100vh" justifyContent="center">
      <Center>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Center>
    </Flex>
  );
}

export default App;
