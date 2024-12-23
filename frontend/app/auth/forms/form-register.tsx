import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast'; 
import { useNavigate } from 'react-router';



const RegisterForm: React.FC = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password') {
      if (value.length < 6) {
        setErrors((prev) => ({ ...prev, password: 'Le mot de passe doit contenir au moins 6 caractères.' }));
      } else {
        setErrors((prev) => ({ ...prev, password: '' }));
      }
    }

    if (name === 'confirmPassword') {
      if (value !== formData.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Les mots de passe ne correspondent pas.' }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.password || errors.confirmPassword) {
      toast.error("Veuillez corriger les erreurs dans le formulaire.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'enregistrement.');
      }

      toast.success("Inscription réussie !");
      navigate('/dash/employees');
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'inscription.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={formData.username}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>
        <div className="relative">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input
            type="email"
            name="email"
            placeholder="Adresse email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
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
        <div className="relative">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isSubmitting}
            className={`w-full pl-10 px-4 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm`}
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showConfirmPassword ? 'Cacher' : 'Afficher'}
          </button>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-lg transition-all shadow-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {isSubmitting ? 'Envoie...' : "S'inscrire"}
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Déja inscrit ? <a href="/login" className="text-blue-600 hover:underline">Connecter à un compte</a>
      </p>
    </>
  );
};

export default RegisterForm;