import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FaHome, FaCalculator, FaFlask, FaGlobeAmericas } from 'react-icons/fa';

export const Layout: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FaHome, label: 'Inicio' },
    { path: '/matematicas', icon: FaCalculator, label: 'Matemáticas' },
    { path: '/ciencias', icon: FaFlask, label: 'Ciencias' },
    { path: '/sociales', icon: FaGlobeAmericas, label: 'Sociales' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-700">
              🎓 Colegio Mentes Creativas
            </h1>
            <nav>
              <ul className="flex gap-4">
                {navItems.map(({ path, icon: Icon, label }) => {
                  const isActive = location.pathname === path;
                  return (
                    <li key={path}>
                      <Link
                        to={path}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all min-w-[44px] min-h-[44px] ${
                          isActive
                            ? 'bg-blue-100 text-blue-700 font-semibold'
                            : 'hover:bg-gray-100 text-gray-600'
                        }`}
                        aria-label={label}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon size={20} />
                        <span className="hidden md:inline">{label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content - Outlet renderiza las rutas hijas */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>© 2025 Colegio Mentes Creativas - Proyecto de Calidad de Software</p>
        </div>
      </footer>
    </div>
  );
};
