import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaRocket, FaCalculator, FaFlask, FaGlobeAmericas } from 'react-icons/fa';

export const Home: React.FC = () => {
  const modules = [
    {
      id: 'math',
      title: 'Matemáticas',
      subject: 'math',
      icon: '🔢',
      description: 'Aprende sobre áreas y perímetros de figuras geométricas',
      color: 'bg-purple-500',
    },
    {
      id: 'science',
      title: 'Ciencias Naturales',
      subject: 'science',
      icon: '🔬',
      description: 'Explora la tabla periódica de elementos químicos',
      color: 'bg-green-500',
    },
    {
      id: 'social',
      title: 'Ciencias Sociales',
      subject: 'social',
      icon: '🗺️',
      description: 'Descubre los departamentos y capitales de Colombia',
      color: 'bg-orange-500',
    },
  ];

  const moduleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    math: FaCalculator,
    science: FaFlask,
    social: FaGlobeAmericas,
  };

  const moduleColors = {
    math: 'from-purple-500 to-purple-600',
    science: 'from-green-500 to-green-600',
    social: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <FaRocket className="text-4xl animate-bounce" />
            <h1 className="text-4xl md:text-5xl font-bold">
              ¡Bienvenido a tu aventura de aprendizaje!
            </h1>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl">
            Explora, aprende y diviértete con nuestros módulos interactivos diseñados especialmente para ti
          </p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Modules Grid */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Módulos Disponibles</h2>
          <FaStar className="text-yellow-500 animate-pulse" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const IconComponent = moduleIcons[module.id];
            const colorGradient = moduleColors[module.id as keyof typeof moduleColors];
            
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/${module.id === 'math' ? 'matematicas' : module.id === 'science' ? 'ciencias' : 'sociales'}`}>
                  <div className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700 hover:scale-105">
                    {/* Header con gradiente */}
                    <div className={`bg-gradient-to-r ${colorGradient} p-6 relative`}>
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="relative z-10">
                        <div className="flex items-center justify-center mb-3">
                          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                            <IconComponent className="text-3xl text-white" />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1 text-center">{module.title}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2 text-center">
                        {module.description}
                      </p>

                      {/* Button */}
                      <button className={`w-full bg-gradient-to-r ${colorGradient} text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                        Comenzar Módulo →
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto"
      >
        {[
          { icon: '🎯', title: 'Aprendizaje Interactivo', desc: 'Actividades dinámicas y divertidas para aprender jugando' },
          { icon: '📚', title: 'Enriquecimiento de Conocimientos', desc: 'Contenido educativo de calidad para expandir tu aprendizaje' },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-slate-700"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
