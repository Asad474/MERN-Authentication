import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import { toast } from 'react-toastify';

import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/usersApiSlice';
import Loader from '../components/Loader';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const [registerApiCall, {isLoading}] = useRegisterMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo){
            navigate('/');
        }
    }, [userInfo, navigate]);

    const submitHandler = async(event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            toast.error('Password and Confirm Password are not matching with each other.');
        }else{
            try {
                await registerApiCall({name, email, password}).unwrap();
                navigate('/login');
            } catch (err) {   
                toast.error(err?.data?.message || err.error);
            };
        };
    };

    return (
        <FormContainer>
            <h1>Sign Up</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={event => setName(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Confirm Password'
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                <Button type='submit' variant='primary' className='mt-3'> 
                    Sign Up
                </Button>

                <Row className='py-3'>
                    <Col>
                        Already Registered ? <Link to='/login'>Login</Link>   
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};

export default RegisterPage;