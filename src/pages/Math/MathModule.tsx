import { useState, useEffect } from 'react';
import { FaCalculator, FaTrophy, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ShapeViewer } from '../../components/ui/ShapeViewer';
import {
  calculateSquare,
  calculateRectangle,
  calculateCircle,
  calculateTriangleByBaseHeight,
  calculateTriangleBySides,
  calculateRegularPolygon,
  type CalculationResult,
} from '../../utils/mathFormulas';

type ShapeType = 'square' | 'rectangle' | 'circle' | 'triangle-base' | 'triangle-sides' | 'polygon';
type Mode = 'calculator' | 'challenge';

interface QuizQuestion {
  id: number;
  shape: ShapeType;
  question: string;
  inputs: Record<string, number>;
  correctAnswer: number;
  answerType: 'area' | 'perimeter';
}

export function MathModule() {
  const [mode, setMode] = useState<Mode>('calculator');
  const [selectedShape, setSelectedShape] = useState<ShapeType>('square');
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string>('');
  const [moduleProgress, setModuleProgress] = useState(0);

  // Challenge mode state
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos = 300 segundos
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Cargar progreso del módulo
  useEffect(() => {
    const progress = localStorage.getItem('moduleProgress');
    if (progress) {
      const parsed = JSON.parse(progress);
      const mathModule = parsed.find((m: any) => m.id === 'math');
      if (mathModule) {
        setModuleProgress(mathModule.progress);
      }
    }
  }, []);

  // Timer para modo challenge
  useEffect(() => {
    if (mode === 'challenge' && timeLeft > 0 && !challengeComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !challengeComplete) {
      finishChallenge();
    }
  }, [mode, timeLeft, challengeComplete]);

  const shapes = [
    { id: 'square' as ShapeType, name: 'Cuadrado', icon: '⬜' },
    { id: 'rectangle' as ShapeType, name: 'Rectángulo', icon: '▭' },
    { id: 'circle' as ShapeType, name: 'Círculo', icon: '⭕' },
    { id: 'triangle-base' as ShapeType, name: 'Triángulo (Base-Altura)', icon: '🔺' },
    { id: 'triangle-sides' as ShapeType, name: 'Triángulo (3 Lados)', icon: '△' },
    { id: 'polygon' as ShapeType, name: 'Polígono Regular', icon: '⬡' },
  ];

  const getInputFields = (shape: ShapeType): Array<{ key: string; label: string; placeholder: string }> => {
    switch (shape) {
      case 'square':
        return [{ key: 'side', label: 'Lado', placeholder: 'Ejemplo: 5' }];
      case 'rectangle':
        return [
          { key: 'length', label: 'Largo', placeholder: 'Ejemplo: 8' },
          { key: 'width', label: 'Ancho', placeholder: 'Ejemplo: 5' },
        ];
      case 'circle':
        return [{ key: 'radius', label: 'Radio', placeholder: 'Ejemplo: 7' }];
      case 'triangle-base':
        return [
          { key: 'base', label: 'Base', placeholder: 'Ejemplo: 6' },
          { key: 'height', label: 'Altura', placeholder: 'Ejemplo: 4' },
        ];
      case 'triangle-sides':
        return [
          { key: 'sideA', label: 'Lado A', placeholder: 'Ejemplo: 5' },
          { key: 'sideB', label: 'Lado B', placeholder: 'Ejemplo: 6' },
          { key: 'sideC', label: 'Lado C', placeholder: 'Ejemplo: 7' },
        ];
      case 'polygon':
        return [
          { key: 'sides', label: 'Número de lados', placeholder: 'Ejemplo: 6 (hexágono)' },
          { key: 'sideLength', label: 'Longitud de cada lado', placeholder: 'Ejemplo: 5' },
        ];
      default:
        return [];
    }
  };

  const handleCalculate = () => {
    setError('');
    setResult(null);

    const inputFields = getInputFields(selectedShape);
    const values: Record<string, number> = {};

    // Validar que todos los campos estén llenos
    for (const field of inputFields) {
      const value = parseFloat(inputs[field.key]);
      if (isNaN(value) || value <= 0) {
        setError(`Por favor ingresa un valor válido para ${field.label.toLowerCase()}`);
        return;
      }
      values[field.key] = value;
    }

    try {
      let calculationResult: CalculationResult;

      switch (selectedShape) {
        case 'square':
          calculationResult = calculateSquare(values.side);
          break;
        case 'rectangle':
          calculationResult = calculateRectangle(values.length, values.width);
          break;
        case 'circle':
          calculationResult = calculateCircle(values.radius);
          break;
        case 'triangle-base':
          calculationResult = calculateTriangleByBaseHeight(values.base, values.height);
          break;
        case 'triangle-sides':
          calculationResult = calculateTriangleBySides(values.sideA, values.sideB, values.sideC);
          break;
        case 'polygon':
          calculationResult = calculateRegularPolygon(Math.round(values.sides), values.sideLength);
          break;
        default:
          throw new Error('Figura no soportada');
      }

      setResult(calculationResult);

      // Actualizar progreso (primera vez que calcula correctamente)
      if (moduleProgress < 50) {
        updateModuleProgress(50);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el cálculo');
    }
  };

  const updateModuleProgress = (progress: number) => {
    const stored = localStorage.getItem('moduleProgress');
    const modules = stored ? JSON.parse(stored) : [];
    const mathIndex = modules.findIndex((m: any) => m.id === 'math');

    if (mathIndex >= 0) {
      modules[mathIndex].progress = progress;
    } else {
      modules.push({ id: 'math', progress });
    }

    localStorage.setItem('moduleProgress', JSON.stringify(modules));
    setModuleProgress(progress);
  };

  const generateQuestions = (): QuizQuestion[] => {
    const questionPool: QuizQuestion[] = [];
    let id = 1;

    // Generar preguntas variadas
    const shapes: ShapeType[] = ['square', 'rectangle', 'circle', 'triangle-base', 'triangle-sides', 'polygon'];

    for (let i = 0; i < 10; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const answerType = Math.random() > 0.5 ? 'area' : 'perimeter';

      let question = '';
      let inputs: Record<string, number> = {};
      let correctAnswer = 0;

      switch (shape) {
        case 'square': {
          const side = Math.floor(Math.random() * 10) + 3;
          inputs = { side };
          const calc = calculateSquare(side);
          correctAnswer = answerType === 'area' ? calc.area : calc.perimeter;
          question = `Calcula el ${answerType === 'area' ? 'área' : 'perímetro'} de un cuadrado con lado de ${side} unidades`;
          break;
        }
        case 'rectangle': {
          const length = Math.floor(Math.random() * 10) + 3;
          const width = Math.floor(Math.random() * 10) + 3;
          inputs = { length, width };
          const calc = calculateRectangle(length, width);
          correctAnswer = answerType === 'area' ? calc.area : calc.perimeter;
          question = `Calcula el ${answerType === 'area' ? 'área' : 'perímetro'} de un rectángulo de ${length} × ${width} unidades`;
          break;
        }
        case 'circle': {
          const radius = Math.floor(Math.random() * 8) + 2;
          inputs = { radius };
          const calc = calculateCircle(radius);
          correctAnswer = answerType === 'area' ? calc.area : calc.perimeter;
          question = `Calcula el ${answerType === 'area' ? 'área' : 'perímetro'} de un círculo con radio de ${radius} unidades (redondea a 2 decimales)`;
          break;
        }
        case 'triangle-base': {
          const base = Math.floor(Math.random() * 10) + 3;
          const height = Math.floor(Math.random() * 10) + 3;
          inputs = { base, height };
          const calc = calculateTriangleByBaseHeight(base, height);
          correctAnswer = calc.area;
          question = `Calcula el área de un triángulo con base ${base} y altura ${height} unidades`;
          break;
        }
        case 'triangle-sides': {
          const a = 5;
          const b = 6;
          const c = 7;
          inputs = { sideA: a, sideB: b, sideC: c };
          const calc = calculateTriangleBySides(a, b, c);
          correctAnswer = answerType === 'area' ? calc.area : calc.perimeter;
          question = `Calcula el ${answerType === 'area' ? 'área' : 'perímetro'} de un triángulo con lados 5, 6 y 7 unidades (redondea a 2 decimales)`;
          break;
        }
        case 'polygon': {
          const sides = 6;
          const sideLength = Math.floor(Math.random() * 5) + 3;
          inputs = { sides, sideLength };
          const calc = calculateRegularPolygon(sides, sideLength);
          correctAnswer = answerType === 'area' ? calc.area : calc.perimeter;
          question = `Calcula el ${answerType === 'area' ? 'área' : 'perímetro'} de un hexágono regular con lados de ${sideLength} unidades (redondea a 2 decimales)`;
          break;
        }
      }

      questionPool.push({
        id: id++,
        shape,
        question,
        inputs,
        correctAnswer: Math.round(correctAnswer * 100) / 100,
        answerType,
      });
    }

    return questionPool;
  };

  const startChallenge = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(300);
    setChallengeComplete(false);
    setUserAnswer('');
    setShowFeedback(false);
    setMode('challenge');
  };

  const submitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswerNum = parseFloat(userAnswer);
    const correct = Math.abs(userAnswerNum - currentQuestion.correctAnswer) < 0.5;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setUserAnswer('');
        setShowFeedback(false);
      } else {
        finishChallenge();
      }
    }, 2000);
  };

  const finishChallenge = () => {
    setChallengeComplete(true);
    const finalScore = (score / questions.length) * 100;

    // Si completa el challenge, actualizar progreso a 100%
    if (finalScore >= 70) {
      updateModuleProgress(100);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (mode === 'challenge' && !challengeComplete) {
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header del challenge */}
          <div className="flex justify-between items-center mb-6">
            <Button variant="secondary" onClick={() => setMode('calculator')}>
              ← Volver a Calculadora
            </Button>
            <div className="flex items-center gap-4">
              <Badge variant="info">
                Pregunta {currentQuestionIndex + 1} / {questions.length}
              </Badge>
              <Badge variant={timeLeft < 60 ? 'error' : 'warning'}>
                <FaClock className="inline mr-1" />
                {formatTime(timeLeft)}
              </Badge>
            </div>
          </div>

          {/* Pregunta actual */}
          <Card variant="elevated" className="p-8">
            <h2 className="text-2xl font-bold mb-6">{currentQuestion?.question}</h2>

            <div className="mb-6">
              <ShapeViewer
                type={currentQuestion?.shape.replace('-base', '').replace('-sides', '') as any}
                dimensions={currentQuestion?.inputs || {}}
                className="mx-auto"
              />
            </div>

            {!showFeedback ? (
              <>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Tu respuesta"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                  onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                  autoFocus
                />
                <Button
                  onClick={submitAnswer}
                  disabled={!userAnswer}
                  className="w-full mt-4"
                  size="lg"
                >
                  Enviar Respuesta
                </Button>
              </>
            ) : (
              <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <FaCheckCircle className="text-green-600 text-2xl" />
                      <span className="text-green-800 font-bold text-xl">¡Correcto!</span>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="text-red-600 text-2xl" />
                      <span className="text-red-800 font-bold text-xl">Incorrecto</span>
                    </>
                  )}
                </div>
                <p className="text-gray-700">
                  La respuesta correcta es: <strong>{currentQuestion.correctAnswer}</strong>
                </p>
              </div>
            )}
          </Card>

          {/* Score actual */}
          <div className="mt-4 text-center text-gray-600">
            Puntuación actual: <strong>{score}</strong> / {currentQuestionIndex + (showFeedback ? 1 : 0)}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'challenge' && challengeComplete) {
    const finalScore = (score / questions.length) * 100;
    const passed = finalScore >= 70;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card variant="elevated" className="p-12 text-center">
            <FaTrophy className={`text-8xl mx-auto mb-6 ${passed ? 'text-yellow-500' : 'text-gray-400'}`} />
            <h1 className="text-4xl font-bold mb-4">
              {passed ? '¡Felicidades!' : '¡Buen Intento!'}
            </h1>
            <p className="text-2xl text-gray-600 mb-8">
              Obtuviste <strong>{score}</strong> de <strong>{questions.length}</strong> correctas
            </p>
            <div className="text-6xl font-bold mb-8" style={{ color: passed ? '#10b981' : '#ef4444' }}>
              {finalScore.toFixed(0)}%
            </div>

            {passed && (
              <Badge variant="success" className="text-lg px-6 py-2 mb-6">
                ¡Módulo Completado al 100%!
              </Badge>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={startChallenge} variant="primary" size="lg">
                Intentar de Nuevo
              </Button>
              <Button onClick={() => setMode('calculator')} variant="secondary" size="lg">
                Volver a Calculadora
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <FaCalculator className="text-blue-600" />
              Geometría Interactiva
            </h1>
            <p className="text-gray-600">Aprende a calcular áreas y perímetros de figuras geométricas</p>
          </div>
          <Button onClick={startChallenge} variant="success" size="lg">
            <FaTrophy className="inline mr-2" />
            Modo Reto
          </Button>
        </div>

        {/* Selector de figuras */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {shapes.map((shape) => (
            <button
              key={shape.id}
              onClick={() => {
                setSelectedShape(shape.id);
                setInputs({});
                setResult(null);
                setError('');
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedShape === shape.id
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className="text-4xl mb-2">{shape.icon}</div>
              <div className="text-sm font-medium text-gray-700">{shape.name}</div>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Panel de entrada */}
          <Card variant="elevated" className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              {shapes.find((s) => s.id === selectedShape)?.name}
            </h2>

            {/* Inputs dinámicos */}
            <div className="space-y-4 mb-6">
              {getInputFields(selectedShape).map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    value={inputs[field.key] || ''}
                    onChange={(e) => setInputs({ ...inputs, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    min="0.1"
                    step="0.1"
                  />
                </div>
              ))}
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <Button onClick={handleCalculate} className="w-full" size="lg">
              Calcular
            </Button>
          </Card>

          {/* Panel de resultados y visualización */}
          <div className="space-y-6">
            {/* Visualización de la figura */}
            <Card variant="outlined" className="p-6">
              <h3 className="text-xl font-bold mb-4">Visualización</h3>
              <ShapeViewer
                type={selectedShape.replace('-base', '').replace('-sides', '') as any}
                dimensions={Object.fromEntries(
                  Object.entries(inputs).map(([key, value]) => [key, parseFloat(value) || 0])
                )}
                className="mx-auto"
              />
            </Card>

            {/* Resultados */}
            {result && (
              <Card variant="elevated" className="p-6">
                <h3 className="text-xl font-bold mb-4 text-green-600">Resultados</h3>

                <div className="space-y-4">
                  {/* Área */}
                  {result.area && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Área</div>
                      <div className="text-3xl font-bold text-blue-600">{result.area} u²</div>
                      <div className="text-sm text-gray-500 mt-2">
                        Fórmula: <code className="bg-white px-2 py-1 rounded">{result.formula.area}</code>
                      </div>
                      {result.steps?.area && (
                        <div className="mt-2 text-sm">
                          <div className="font-medium">Pasos:</div>
                          <ul className="list-disc list-inside text-gray-600">
                            {result.steps.area.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Perímetro */}
                  {result.perimeter && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Perímetro</div>
                      <div className="text-3xl font-bold text-purple-600">{result.perimeter} u</div>
                      <div className="text-sm text-gray-500 mt-2">
                        Fórmula: <code className="bg-white px-2 py-1 rounded">{result.formula.perimeter}</code>
                      </div>
                      {result.steps?.perimeter && (
                        <div className="mt-2 text-sm">
                          <div className="font-medium">Pasos:</div>
                          <ul className="list-disc list-inside text-gray-600">
                            {result.steps.perimeter.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Progreso del módulo */}
        {moduleProgress > 0 && (
          <Card variant="outlined" className="mt-8 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Progreso del Módulo</h3>
                <p className="text-gray-600 text-sm">¡Completa el modo reto para llegar al 100%!</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-blue-600">{moduleProgress}%</div>
                {moduleProgress === 100 && <FaTrophy className="text-yellow-500 text-3xl" />}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
