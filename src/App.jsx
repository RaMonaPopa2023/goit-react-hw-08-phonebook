import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import ProtectedRoute from './components/common/router/ProtectedRoute';
import NavigationPage from 'components/NavigationPage/NavigationPage';
import LoginPage from 'components/Login/LoginPage';
import ContactsPage from 'components/Contacts/ContactsPage';
import RegisterPage from 'components/Register/RegisterPage';

import { ChakraProvider } from '@chakra-ui/react';
import { Container, Box } from '@chakra-ui/react';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Container bg="blue.600" color="black">
          <Box padding="4" bg="blue.400" color="black">
            <NavigationPage />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/contacts"
                element={
                  <ProtectedRoute>
                    <ContactsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<div>Hello</div>} />
            </Routes>
          </Box>
        </Container>
      </Router>
    </ChakraProvider>
  );
};

export default App;
