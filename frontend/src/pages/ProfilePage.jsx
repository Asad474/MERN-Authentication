import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import { toast } from 'react-toastify';

import FormContainer from '../components/FormContainer';
import { useUpdateuserMutation } from '../slices/usersApiSlice'; 
import Loader from '../components/Loader';
import { setCredentials } from '../slices/authSlice';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const [updateprofileApiCall, {isLoading}] = useUpdateuserMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    }, [userInfo.name, userInfo.email]);

    const submitHandler = async(event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            toast.error('Passwords are not matching with each other.');
        } else{
            try {
                const res = await updateprofileApiCall({name, email, password}).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile has been updated.');
            } catch (err) {                
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <FormContainer>
            <h1>Update Profile</h1>

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
                        placeholder="Enter Password(if update's required)"
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="Enter Confirm Password(if update's required)"
                        value={confirmPassword}
                        onChange={event => setConfirmPassword(event.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {isLoading && <Loader />}

                <Button type='submit' variant='primary' className='mt-3'> 
                    Update
                </Button>
            </Form>
        </FormContainer>
    );
};

export default RegisterPage;