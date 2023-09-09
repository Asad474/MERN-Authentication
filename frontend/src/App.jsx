import {Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Header />

      <ToastContainer />
      
      <Routes>
        <Route exact path='/' element={ <HomePage /> }></Route>
        <Route exact path='/login' element={ <LoginPage /> }></Route>
        <Route exact path='/register' element={ <RegisterPage />} ></Route>
        <Route path='' element={ <PrivateRoute /> }>
          <Route exact path='/profile' element={ <ProfilePage /> }></Route>
        </Route>
      </Routes>
    </>  
  );
};

export default App;