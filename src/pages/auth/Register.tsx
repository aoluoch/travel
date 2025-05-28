import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Mail, Lock, User } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic will be implemented here
    // For now, just navigate to login
    navigate('/login');
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4 rounded-md shadow-sm">
          <div>
            <Input
              id="username"
              name="username"
              type="text"
              required
              icon={<User className="h-5 w-5 text-gray-400" />}
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <Input
              id="email"
              name="email"
              type="email"
              required
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <Input
              id="password"
              name="password"
              type="password"
              required
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            className="w-full flex justify-center py-3"
          >
            Create Account
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          By registering, you agree to our{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;