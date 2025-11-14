import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { FaHome, FaCalculator, FaFlask, FaGlobeAmericas, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';

export const Layout: React.FC = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const navItems = [
    { path: '/', icon: FaHome, label: 'Inicio', color: 'from-blue-500 to-blue-600' },
    { path: '/matematicas', icon: FaCalculator, label: 'Matemáticas', color: 'from-purple-500 to-purple-600' },
    { path: '/ciencias', icon: FaFlask, label: 'Ciencias', color: 'from-green-500 to-green-600' },
    { path: '/sociales', icon: FaGlobeAmericas, label: 'Sociales', color: 'from-orange-500 to-orange-600' },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Header del Sidebar */}
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center justify-between">
              {sidebarOpen && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg">
                    🎓
                  </div>
                  <div>
                    <h1 className="font-bold text-sm">Colegio Mentes</h1>
                    <p className="text-xs text-slate-400">Creativas</p>
                  </div>
                </div>
              )}
              {!sidebarOpen && (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg mx-auto">
                  🎓
                </div>
              )}
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
            {navItems.map(({ path, icon: Icon, label, color }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${
                    isActive
                      ? `bg-gradient-to-r ${color} shadow-lg scale-105`
                      : 'hover:bg-slate-700/50'
                  }`}
                  aria-label={label}
                  aria-current={isActive ? 'page' : undefined}
                  title={!sidebarOpen ? label : ''}
                >
                  <Icon className={`text-xl ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                  {sidebarOpen && (
                    <span className={`font-medium ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {label}
                    </span>
                  )}
                  {isActive && sidebarOpen && (
                    <div className="absolute right-3 w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer del Sidebar */}
          <div className="p-4 border-t border-slate-700 space-y-3">
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-all"
              aria-label="Cambiar tema"
              title={sidebarOpen ? '' : 'Cambiar tema'}
            >
              {darkMode ? <FaSun className="text-xl text-yellow-400" /> : <FaMoon className="text-xl text-slate-400" />}
              {sidebarOpen && (
                <span className="text-slate-300 font-medium">
                  {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
                </span>
              )}
            </button>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all"
              aria-label={sidebarOpen ? 'Colapsar menú' : 'Expandir menú'}
            >
              {sidebarOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
              {sidebarOpen && <span className="text-sm font-medium">Colapsar</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Top Bar */}
        <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ¡Bienvenido a tu aventura de aprendizaje! 🚀
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Explora, aprende y diviértete con nuestros módulos interactivos
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
                aria-label="Toggle menú"
              >
                <FaBars className="text-xl" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content - Outlet renderiza las rutas hijas */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-slate-700 mt-auto">
          <div className="px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
                © 2025 Colegio Mentes Creativas - Proyecto de Calidad de Software
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Sistema Activo
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
