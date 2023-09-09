import React from 'react';
import HomeContent from '../components/HomeContent';
import {Container} from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container className="my-2">
      <HomeContent />
    </Container>
  );
};

export default HomePage;