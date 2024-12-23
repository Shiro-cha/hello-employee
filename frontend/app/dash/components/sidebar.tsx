import React from 'react';
import { Link } from 'react-router';
import { AiOutlineMenu, AiOutlineClose, AiOutlineUser, AiOutlineSetting, AiOutlineQrcode } from 'react-icons/ai';

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void }> = ({ isOpen, toggleSidebar }) => (
  <div className={`transition-all duration-300 bg-gray-800 text-white h-full ${isOpen ? 'w-auto max-w-xs' : 'w-16'}`}>
    <button 
      onClick={toggleSidebar} 
      className="mb-20 w-full bg-gray-700 hover:bg-gray-600 focus:outline-none rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg active:scale-95 flex justify-center items-center"
      aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
    >
      {isOpen ? 
        <AiOutlineClose className="text-2xl text-white transition-all duration-300" /> : 
        <AiOutlineMenu className="text-2xl text-white transition-all duration-300" />}
    </button>

    <nav className="mt-4">
      <ul className="space-y-4">
        <li>
          <Link to="/dash/employees" className="flex items-center px-4 py-2 hover:bg-gray-600">
            {isOpen ? (
              <>
                <AiOutlineUser className="mr-2" /> Employés
              </>
            ) : (
              <AiOutlineUser className="mx-auto" />
            )}
          </Link>
        </li>
        <li>
          <Link to="/dash/qr" className="flex items-center px-4 py-2 hover:bg-gray-600">
            {isOpen ? (
              <>
                <AiOutlineQrcode className="mr-2" /> Codes QR
              </>
            ) : (
              <AiOutlineQrcode className="mx-auto" />
            )}
          </Link>
        </li>
        <li>
          <Link to="/dash/settings" className="flex items-center px-4 py-2 hover:bg-gray-600">
            {isOpen ? (
              <>
                <AiOutlineSetting className="mr-2" /> Paramètres
              </>
            ) : (
              <AiOutlineSetting className="mx-auto" />
            )}
          </Link>
        </li>
      </ul>
    </nav>
  </div>
);

export default Sidebar;