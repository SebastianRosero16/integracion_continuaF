import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { Badge } from '../../components/ui/Badge';
import { FaTrophy } from 'react-icons/fa';
import type { Module } from '../../types';

export const Home: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);

  useEffect(() => {
    // Cargar progreso desde localStorage
    const savedProgress = localStorage.getItem('moduleProgress');
    const progress = savedProgress ? JSON.parse(savedProgress) : {};

    const modulesData: Module[] = [
      {
        id: 'math',
        title: 'Matemáticas',
        subject: 'math',
        icon: '🔢',
        description: 'Aprende sobre áreas y perímetros de figuras geométricas',
        progress: progress.math || 0,
        color: 'bg-blue-500',
      },
      {
        id: 'science',
        title: 'Ciencias Naturales',
        subject: 'science',
        icon: '🔬',
        description: 'Explora la tabla periódica de elementos químicos',
        progress: progress.science || 0,
        color: 'bg-green-500',
      },
      {
        id: 'social',
        title: 'Ciencias Sociales',
        subject: 'social',
        icon: '🗺️',
        description: 'Descubre los departamentos y capitales de Colombia',
        progress: progress.social || 0,
        color: 'bg-purple-500',
      },
    ];

    setModules(modulesData);
  }, []);

  const totalProgress = modules.reduce((sum, m) => sum + m.progress, 0) / modules.length;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          ¡Bienvenido a tu aventura de aprendizaje! 🚀
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explora, aprende y diviértete con nuestros módulos interactivos diseñados especialmente para ti
        </p>
      </section>

      {/* Overall Progress */}
      <Card variant="elevated" className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <FaTrophy className="text-yellow-500" size={32} />
          <h2 className="text-2xl font-bold text-gray-800">Tu Progreso General</h2>
        </div>
        <Progress value={totalProgress} label="Completado" showPercentage />
        {totalProgress === 100 && (
          <Badge variant="success" className="mt-4">
            🎉 ¡Felicitaciones! Has completado todos los módulos
          </Badge>
        )}
      </Card>

      {/* Modules Grid */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Módulos Disponibles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link key={module.id} to={`/${module.id === 'math' ? 'matematicas' : module.id === 'science' ? 'ciencias' : 'sociales'}`}>
              <Card
                variant="elevated"
                className="h-full hover:scale-105 transition-transform cursor-pointer"
                ariaLabel={`Ir a ${module.title}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-5xl">{module.icon}</span>
                    <Badge variant={module.progress === 100 ? 'success' : 'default'}>
                      {module.progress}%
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{module.title}</h3>
                  <p className="text-gray-600">{module.description}</p>
                  <Progress value={module.progress} showPercentage={false} />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
