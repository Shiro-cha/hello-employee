import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { GiSuitcase } from 'react-icons/gi';

export function Welcome() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4 bg-white">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h1 className="text-center text-5xl font-extrabold text-blue-700">
              Bienvenue à <span className="text-green-600">HelloEmployé</span>
            </h1>
            <p className="text-center text-lg text-gray-800 mt-4 flex items-center justify-center gap-2">
              <GiSuitcase className="text-green-500 text-2xl" /> Gérez votre carrière avec élégance et simplicité.
            </p>
          </div>
        </header>
        <div className="max-w-[300px] w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-300 p-6 space-y-4 shadow-lg bg-gray-50">
            <p className="leading-6 text-gray-800 text-center font-medium">
              Faites votre choix :
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  className="group flex items-center justify-center p-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all gap-2"
                  href="/login"
                >
                  <FaSignInAlt className="text-xl" /> Connexion
                </a>
              </li>
              <li>
                <a
                  className="group flex items-center justify-center p-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all gap-2"
                  href="/register"
                >
                  <FaUserPlus className="text-xl" /> Inscription
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex justify-center mt-4">
            <img
              src="https://media.giphy.com/media/3o6ZsYm5DQQ5wb9arW/giphy.gif"
              alt="Welcome GIF"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
