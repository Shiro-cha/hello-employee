import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div className={`transition-all duration-300 bg-gray-800 text-white h-full ${isOpen ? 'w-64' : 'w-16'}`}>
    {/* Bouton pour ouvrir/fermer la barre latérale */}
    <button
      onClick={toggleSidebar}
      className="p-4 text-center w-full bg-gray-700 hover:bg-gray-600 focus:outline-none"
      aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
    >
      {isOpen ? 'Fermer' : 'Menu'}
    </button>

    {/* Navigation */}
    <nav className="mt-4">
      <ul className="space-y-4">
        <li>
          <Link to="/employees" className="block px-4 py-2 hover:bg-gray-600">
            Employés
          </Link>
        </li>
        <li>
          <Link to="/settings" className="block px-4 py-2 hover:bg-gray-600">
            Paramètres
          </Link>
        </li>
        <li>
          <Link to="/qrcodes" className="block px-4 py-2 hover:bg-gray-600">
            QR Codes
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);
