import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

const Createuser = () => {
  const [input, setInput] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    const api = "http://localhost:8000/admin/createuser";
    try {
      const response = await axios.post(api, input);
      setMessage(response.data.message || 'User  created successfully!');
      setError(false);
    } catch (error) {
      setMessage('Error creating user. Please try again.');
      setError(true);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-96 transition-transform duration-300 ease-in-out transform hover:scale-105">
        {message && (
          <Alert variant={error ? 'danger' : 'success'} className="mb-4">
            {message}
          </Alert>
        )}
        <h2 className="text-white text-xl font-bold mb-4 text-center">Create User</h2>
        <Form>
          <Form.Group className="mb-4" controlId="formBasicUsername">
            <Form.Label className="text-white">Enter your name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={input.username || ''}
              onChange={handleInput}
              required
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicDesignation">
            <Form.Label className="text-white">Designation</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="designation"
              value={input.designation || ''}
              onChange={handleInput}
              required
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              <option value="">Select designation</option>
              <option value="Frontend">Front end Designer</option>
              <option value="Backend">Back end Designer</option>
              <option value="Analyst">Analyst</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicEmail">
            <Form.Label className="text-white">Enter your email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={input.email || ''}
              onChange={handleInput}
              required
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={input.password || ''}
              onChange={handleInput}
              required
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
          </Form.Group>
          <Button 
            variant="primary" 
            type="button" 
            className="w-full bg-blue-600 self-center hover:bg-blue-500 transition duration-300 ease-in-out text-white font-semibold py-2 rounded-md transform hover:scale-105"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Createuser;