import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast'; // Instruction: run `npm install react-hot-toast`
import { useNavigate } from "react-router"; // Ensure you import this
import Cookies from 'js-cookie'; // Add js-cookie import

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prev) => ({ ...prev, email: emailRegex.test(value) ? '' : 'Adresse email invalide.' }));
    }

    if (name === 'password') {
      setErrors((prev) => ({ ...prev, password: value.length >= 6 ? '' : 'Le mot de passe doit contenir au moins 6 caractères.' }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.email || errors.password || !formData.email || !formData.password) {
      toast.error('Veuillez corriger les erreurs dans le formulaire.');
      return;
    }
    setIsSubmitting(true);
    try {
    
      const response = await fetch('http://127.0.0.1:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Échec de la connexion.');
      }

      const result = await response.json();
      
  
      Cookies.set('token', result.token, { path: '/', secure: true });

      toast.success('Connexion réussie !');
      setFormData({ email: '', password: '' });

     
      navigate('/dash/employees');
    } catch (error) {
      toast.error('Une erreur est survenue lors de la connexion.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full pl-10 px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full pl-10 px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? 'Cacher' : 'Afficher'}
          </button>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || errors.email || errors.password || !formData.email || !formData.password}
          className={`w-full py-2 rounded-lg transition-all shadow-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {isSubmitting ? 'Chargement...' : 'Connexion'}
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Pas encore inscrit ? <a href="/register" className="text-blue-600 hover:underline">Créer un compte</a>
      </p>
    </>
  );
};

export default LoginForm;
