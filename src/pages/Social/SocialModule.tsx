import { useState, useEffect } from 'react';
import { FaMapMarkedAlt, FaTrophy, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  departamentos,
  getRegions,
  getRegionColor,
  type Departamento,
} from '../../data/departamentos';

type Mode = 'explore' | 'quiz';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  departamento: Departamento;
  type: 'capital' | 'region' | 'select';
}

export function SocialModule() {
  const [selectedDepartamento, setSelectedDepartamento] = useState<Departamento | null>(null);
  const [mode, setMode] = useState<Mode>('explore');
  const [moduleProgress, setModuleProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');

  // Quiz state
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Cargar progreso
  useEffect(() => {
    const progress = localStorage.getItem('moduleProgress');
    if (progress) {
      const parsed = JSON.parse(progress);
      const socialModule = parsed.find((m: any) => m.id === 'social');
      if (socialModule) {
        setModuleProgress(socialModule.progress);
      }
    }
  }, []);

  const updateModuleProgress = (progress: number) => {
    const stored = localStorage.getItem('moduleProgress');
    const modules = stored ? JSON.parse(stored) : [];
    const socialIndex = modules.findIndex((m: any) => m.id === 'social');

    if (socialIndex >= 0) {
      modules[socialIndex].progress = progress;
    } else {
      modules.push({ id: 'social', progress });
    }

    localStorage.setItem('moduleProgress', JSON.stringify(modules));
    setModuleProgress(progress);
  };

  const filteredDepartamentos = departamentos.filter((dept) => {
    const matchesSearch =
      !searchQuery ||
      dept.depto.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.capital.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = regionFilter === 'all' || dept.region === regionFilter;
    return matchesSearch && matchesRegion;
  });

  const generateQuestions = (): QuizQuestion[] => {
    const questionPool: QuizQuestion[] = [];
    const selectedDepts = [...departamentos].sort(() => 0.5 - Math.random()).slice(0, 10);

    selectedDepts.forEach((dept, index) => {
      const questionTypes: Array<{
        question: string;
        getOptions: () => string[];
        correctAnswer: string;
        explanation: string;
        type: 'capital' | 'region' | 'select';
      }> = [
        // Tipo 1: Identificar capital
        {
          question: `¿Cuál es la capital del departamento de ${dept.depto}?`,
          getOptions: () => {
            const others = departamentos
              .filter((d) => d.capital !== dept.capital)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((d) => d.capital);
            return [dept.capital, ...others].sort(() => 0.5 - Math.random());
          },
          correctAnswer: dept.capital,
          explanation: `La capital de ${dept.depto} es ${dept.capital}. ${dept.facts[0]}`,
          type: 'capital',
        },
        // Tipo 2: Identificar región
        {
          question: `¿A qué región natural pertenece ${dept.depto}?`,
          getOptions: () => {
            const regions = getRegions();
            return regions.sort(() => 0.5 - Math.random());
          },
          correctAnswer: dept.region,
          explanation: `${dept.depto} pertenece a la región ${dept.region}. ${dept.facts[1] || dept.facts[0]}`,
          type: 'region',
        },
        // Tipo 3: Datos del departamento
        {
          question: `¿Qué departamento tiene como capital a ${dept.capital}?`,
          getOptions: () => {
            const others = departamentos
              .filter((d) => d.depto !== dept.depto)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((d) => d.depto);
            return [dept.depto, ...others].sort(() => 0.5 - Math.random());
          },
          correctAnswer: dept.depto,
          explanation: `${dept.capital} es la capital de ${dept.depto}. ${dept.facts[0]}`,
          type: 'select',
        },
      ];

      const questionType = questionTypes[index % questionTypes.length];

      questionPool.push({
        id: index + 1,
        question: questionType.question,
        options: questionType.getOptions(),
        correctAnswer: questionType.correctAnswer,
        explanation: questionType.explanation,
        departamento: dept,
        type: questionType.type,
      });
    });

    return questionPool;
  };

  const startQuiz = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizComplete(false);
    setSelectedAnswer('');
    setShowFeedback(false);
    setMode('quiz');
  };

  const submitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer('');
        setShowFeedback(false);
      } else {
        finishQuiz();
      }
    }, 3000);
  };

  const finishQuiz = () => {
    setQuizComplete(true);
    const finalScore = (score / questions.length) * 100;

    if (moduleProgress < 50) {
      updateModuleProgress(50);
    }

    if (finalScore >= 70) {
      updateModuleProgress(100);
    }
  };

  const regions = getRegions();

  if (mode === 'quiz' && !quizComplete) {
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Button variant="secondary" onClick={() => setMode('explore')}>
              ← Volver a Explorar
            </Button>
            <Badge variant="info">
              Pregunta {currentQuestionIndex + 1} / {questions.length}
            </Badge>
          </div>

          <Card variant="elevated" className="p-8">
            <div className="text-center mb-4">
              <Badge className={getRegionColor(currentQuestion.departamento.region)}>
                {currentQuestion.departamento.region}
              </Badge>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center">{currentQuestion.question}</h2>

            {!showFeedback ? (
              <>
                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedAnswer(option)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all min-h-[44px] ${
                        selectedAnswer === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <Button onClick={submitAnswer} disabled={!selectedAnswer} className="w-full" size="lg">
                  Enviar Respuesta
                </Button>
              </>
            ) : (
              <div className={`p-6 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="flex items-center gap-3 mb-3">
                  {isCorrect ? (
                    <>
                      <FaCheckCircle className="text-green-600 text-3xl" />
                      <span className="text-green-800 font-bold text-2xl">¡Correcto!</span>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="text-red-600 text-3xl" />
                      <span className="text-red-800 font-bold text-2xl">Incorrecto</span>
                    </>
                  )}
                </div>
                <p className="text-gray-700 mb-2">
                  <strong>Respuesta correcta:</strong> {currentQuestion.correctAnswer}
                </p>
                <p className="text-gray-600 text-sm">{currentQuestion.explanation}</p>
              </div>
            )}
          </Card>

          <div className="mt-4 text-center text-gray-600">
            Puntuación: <strong>{score}</strong> / {currentQuestionIndex + (showFeedback ? 1 : 0)}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'quiz' && quizComplete) {
    const finalScore = (score / questions.length) * 100;
    const passed = finalScore >= 70;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card variant="elevated" className="p-12 text-center">
            <FaTrophy className={`text-8xl mx-auto mb-6 ${passed ? 'text-yellow-500' : 'text-gray-400'}`} />
            <h1 className="text-4xl font-bold mb-4">{passed ? '¡Excelente!' : '¡Buen Intento!'}</h1>
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
              <Button onClick={startQuiz} variant="primary" size="lg">
                Intentar de Nuevo
              </Button>
              <Button onClick={() => setMode('explore')} variant="secondary" size="lg">
                Volver a Explorar
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <FaMapMarkedAlt className="text-green-600" />
              Geografía de Colombia
            </h1>
            <p className="text-gray-600">Explora los 32 departamentos de Colombia y sus características</p>
          </div>
          <Button onClick={startQuiz} variant="success" size="lg">
            <FaTrophy className="inline mr-2" />
            Quiz de 10 Preguntas
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar departamento o capital..."
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          >
            <option value="all">Todas las regiones</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredDepartamentos.map((dept) => (
                <Card
                  key={dept.code}
                  variant={selectedDepartamento?.code === dept.code ? 'elevated' : 'outlined'}
                  className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                    selectedDepartamento?.code === dept.code ? 'border-blue-500 border-2' : ''
                  }`}
                  onClick={() => setSelectedDepartamento(dept)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{dept.depto}</h3>
                    <Badge className={getRegionColor(dept.region)}>
                      {dept.region}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-2">
                    <strong>Capital:</strong> {dept.capital}
                  </p>
                  <div className="text-sm text-gray-500">
                    <p>
                      <strong>Población:</strong> {dept.population.toLocaleString()} hab.
                    </p>
                    <p>
                      <strong>Área:</strong> {dept.area.toLocaleString()} km²
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {filteredDepartamentos.length === 0 && (
              <Card variant="outlined" className="p-12 text-center">
                <p className="text-gray-500 text-lg">No se encontraron departamentos</p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setRegionFilter('all');
                  }}
                  className="mt-4"
                >
                  Limpiar Filtros
                </Button>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1">
            {selectedDepartamento ? (
              <Card variant="elevated" className="p-6 sticky top-4">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">{selectedDepartamento.depto}</h2>
                  <p className="text-xl text-gray-600 mb-3">Capital: {selectedDepartamento.capital}</p>
                  <Badge className={getRegionColor(selectedDepartamento.region)}>
                    {selectedDepartamento.region}
                  </Badge>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Población</div>
                    <div className="text-lg font-semibold">{selectedDepartamento.population.toLocaleString()} habitantes</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Área</div>
                    <div className="text-lg font-semibold">{selectedDepartamento.area.toLocaleString()} km²</div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="text-sm text-gray-600 mb-3">📌 Datos Interesantes</div>
                    <ul className="space-y-2">
                      {selectedDepartamento.facts.map((fact, index) => (
                        <li key={index} className="text-sm bg-blue-50 p-3 rounded">
                          {fact}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ) : (
              <Card variant="outlined" className="p-12 text-center sticky top-4">
                <FaMapMarkedAlt className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Selecciona un departamento para ver sus detalles</p>
              </Card>
            )}
          </div>
        </div>

        {moduleProgress > 0 && (
          <Card variant="outlined" className="mt-8 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Progreso del Módulo</h3>
                <p className="text-gray-600 text-sm">¡Completa el quiz con al menos 70% para llegar al 100%!</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-green-600">{moduleProgress}%</div>
                {moduleProgress === 100 && <FaTrophy className="text-yellow-500 text-3xl" />}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
