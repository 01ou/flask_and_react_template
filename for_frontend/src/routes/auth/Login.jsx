<<<<<<< HEAD
import { TextInput } from '../../components/_index';
import { Form, useActionData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authAction } from './response';

export async function action({ request }) {
  return (await authAction(request, '/login', '/'));
}

const Login = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const actionData = useActionData();
  useEffect(() => {
    if (actionData) {
      setError(actionData.error);
    }
  }, [actionData])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  return (
    <div className='text-center m-0 p-20 bg-gray-50'>
    <h1 className="text-4xl text-blue-600 font-bold mb-8">Login</h1>
    <Form method="post" className="mb-4">
      <TextInput
        label='UserName' name='username' placeholder='Enter your userName'
        formData={formData} handleInputChange={handleInputChange}
      />
      <TextInput
        label='Password' name='password' placeholder='Enter your password' type='password'
        formData={formData} handleInputChange={handleInputChange}
      />
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="submit" value="Submit"
        className="bg-blue-400 text-white px-8 py-2 mt-4 rounded-md cursor-pointer"
      />
    </Form>
  </div>
  )
}

=======
import { TextInput } from '../../components/_index';
import { Form, useActionData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authAction } from './response';

export async function action({ request }) {
  return (await authAction(request, '/login', '/'));
}

const Login = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const actionData = useActionData();
  useEffect(() => {
    if (actionData) {
      setError(actionData.error);
    }
  }, [actionData])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  return (
    <div className='text-center m-0 p-20 bg-gray-50'>
    <h1 className="text-4xl text-blue-600 font-bold mb-8">Login</h1>
    <Form method="post" className="mb-4">
      <TextInput
        label='UserName' name='username' placeholder='Enter your userName'
        formData={formData} handleInputChange={handleInputChange}
      />
      <TextInput
        label='Password' name='password' placeholder='Enter your password' type='password'
        formData={formData} handleInputChange={handleInputChange}
      />
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="submit" value="Submit"
        className="bg-blue-400 text-white px-8 py-2 mt-4 rounded-md cursor-pointer"
      />
    </Form>
  </div>
  )
}

>>>>>>> 0ef9041a5b4bc16d21fc553f98b890b58cd570dc
export default Login;