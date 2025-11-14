import { useState, useEffect } from 'react';
import { FaFlask, FaSearch, FaTrophy, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import elementsData from '../../data/elements.json';
import {
  searchElements,
  filterByCategory,
  filterByState,
  getCategories,
  getStates,
  getCategoryColor,
  getCategoryName,
  getStateName,
  getStateEmoji,
  sortByAtomicNumber,
  type ChemicalElement,
} from '../../utils/elementUtils';

type Mode = 'explore' | 'quiz';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  element: ChemicalElement;
}

export function ScienceModule() {
  const [elements] = useState<ChemicalElement[]>(sortByAtomicNumber(elementsData as ChemicalElement[]));
  const [filteredElements, setFilteredElements] = useState<ChemicalElement[]>(elements);
  const [selectedElement, setSelectedElement] = useState<ChemicalElement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stateFilter, setStateFilter] = useState('all');
  const [mode, setMode] = useState<Mode>('explore');
  const [moduleProgress, setModuleProgress] = useState(0);

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
      const scienceModule = parsed.find((m: any) => m.id === 'science');
      if (scienceModule) {
        setModuleProgress(scienceModule.progress);
      }
    }
  }, []);

  // Aplicar filtros
  useEffect(() => {
    let result = elements;

    // Búsqueda
    if (searchQuery) {
      result = searchElements(result, searchQuery);
    }

    // Filtro de categoría
    if (categoryFilter !== 'all') {
      result = filterByCategory(result, categoryFilter);
    }

    // Filtro de estado
    if (stateFilter !== 'all') {
      result = filterByState(result, stateFilter);
    }

    setFilteredElements(result);
  }, [searchQuery, categoryFilter, stateFilter, elements]);

  const updateModuleProgress = (progress: number) => {
    const stored = localStorage.getItem('moduleProgress');
    const modules = stored ? JSON.parse(stored) : [];
    const scienceIndex = modules.findIndex((m: any) => m.id === 'science');

    if (scienceIndex >= 0) {
      modules[scienceIndex].progress = progress;
    } else {
      modules.push({ id: 'science', progress });
    }

    localStorage.setItem('moduleProgress', JSON.stringify(modules));
    setModuleProgress(progress);
  };

  const generateQuestions = (): QuizQuestion[] => {
    const questionPool: QuizQuestion[] = [];
    const selectedElements = [...elements]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    selectedElements.forEach((element, index) => {
      const questionTypes = [
        // Tipo 1: Identificar símbolo
        {
          question: `¿Cuál es el símbolo químico del ${element.name}?`,
          getOptions: () => {
            const others = elements
              .filter((e) => e.symbol !== element.symbol)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((e) => e.symbol);
            return [element.symbol, ...others].sort(() => 0.5 - Math.random());
          },
          correctAnswer: element.symbol,
          explanation: `El símbolo químico del ${element.name} es ${element.symbol}. ${element.uses}`,
        },
        // Tipo 2: Identificar nombre
        {
          question: `¿Qué elemento tiene el símbolo "${element.symbol}"?`,
          getOptions: () => {
            const others = elements
              .filter((e) => e.name !== element.name)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((e) => e.name);
            return [element.name, ...others].sort(() => 0.5 - Math.random());
          },
          correctAnswer: element.name,
          explanation: `${element.symbol} es el símbolo del ${element.name}. Se usa en: ${element.uses}`,
        },
        // Tipo 3: Estado físico
        {
          question: `¿En qué estado se encuentra el ${element.name} a temperatura ambiente?`,
          getOptions: () => ['Sólido', 'Líquido', 'Gas'].sort(() => 0.5 - Math.random()),
          correctAnswer: getStateName(element.state),
          explanation: `El ${element.name} es un ${getStateName(element.state).toLowerCase()} a temperatura ambiente. ${element.uses}`,
        },
        // Tipo 4: Categoría
        {
          question: `¿A qué categoría pertenece el ${element.name}?`,
          getOptions: () => {
            const others = getCategories(elements)
              .filter((c) => c !== element.category)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map((c) => getCategoryName(c));
            return [getCategoryName(element.category), ...others].sort(() => 0.5 - Math.random());
          },
          correctAnswer: getCategoryName(element.category),
          explanation: `El ${element.name} pertenece a la categoría ${getCategoryName(element.category)}. ${element.uses}`,
        },
        // Tipo 5: Número atómico
        {
          question: `¿Cuál es el número atómico del ${element.name}?`,
          getOptions: () => {
            const options = [element.atomicNumber];
            while (options.length < 4) {
              const randomNum = Math.floor(Math.random() * 100) + 1;
              if (!options.includes(randomNum)) {
                options.push(randomNum);
              }
            }
            return options.map(String).sort(() => 0.5 - Math.random());
          },
          correctAnswer: String(element.atomicNumber),
          explanation: `El número atómico del ${element.name} es ${element.atomicNumber}, lo que significa que tiene ${element.atomicNumber} protones en su núcleo.`,
        },
      ];

      const questionType = questionTypes[index % questionTypes.length];

      questionPool.push({
        id: index + 1,
        question: questionType.question,
        options: questionType.getOptions(),
        correctAnswer: questionType.correctAnswer,
        explanation: questionType.explanation,
        element,
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

    // Actualizar progreso
    if (moduleProgress < 50) {
      updateModuleProgress(50);
    }

    if (finalScore >= 80) {
      updateModuleProgress(100);
    }
  };

  const categories = getCategories(elements);
  const states = getStates(elements);

  if (mode === 'quiz' && !quizComplete) {
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header del quiz */}
          <div className="flex justify-between items-center mb-6">
            <Button variant="secondary" onClick={() => setMode('explore')}>
              ← Volver a Explorar
            </Button>
            <Badge variant="info">
              Pregunta {currentQuestionIndex + 1} / {questions.length}
            </Badge>
          </div>

          {/* Pregunta actual */}
          <Card variant="elevated" className="p-8">
            <div className="text-center mb-6">
              <span className="text-6xl">{currentQuestion?.element.emoji}</span>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center">{currentQuestion?.question}</h2>

            {!showFeedback ? (
              <>
                <div className="space-y-3 mb-6">
                  {currentQuestion?.options.map((option) => (
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

          {/* Puntuación actual */}
          <div className="mt-4 text-center text-gray-600">
            Puntuación: <strong>{score}</strong> / {currentQuestionIndex + (showFeedback ? 1 : 0)}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'quiz' && quizComplete) {
    const finalScore = (score / questions.length) * 100;
    const passed = finalScore >= 80;

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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <FaFlask className="text-purple-600" />
              Tabla Periódica Interactiva
            </h1>
            <p className="text-gray-600">Explora los elementos químicos y aprende sus propiedades</p>
          </div>
          <Button onClick={startQuiz} variant="success" size="lg">
            <FaTrophy className="inline mr-2" />
            Quiz de 5 Preguntas
          </Button>
        </div>

        {/* Búsqueda y filtros */}
        <Card variant="outlined" className="p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Barra de búsqueda */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar elemento..."
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Filtro de categoría */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="all">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {getCategoryName(cat)}
                </option>
              ))}
            </select>

            {/* Filtro de estado */}
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            >
              <option value="all">Todos los estados</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {getStateEmoji(state)} {getStateName(state)}
                </option>
              ))}
            </select>
          </div>

          {/* Contador de resultados */}
          <div className="mt-4 text-sm text-gray-600">
            Mostrando <strong>{filteredElements.length}</strong> de <strong>{elements.length}</strong> elementos
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Grid de elementos */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredElements.map((element) => (
                <button
                  key={element.atomicNumber}
                  onClick={() => setSelectedElement(element)}
                  className={`p-4 rounded-lg border-2 transition-all min-h-[120px] flex flex-col items-center justify-center ${
                    selectedElement?.atomicNumber === element.atomicNumber
                      ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
                      : `${getCategoryColor(element.category)} hover:scale-105 hover:shadow-md`
                  }`}
                  aria-label={`${element.name}, número atómico ${element.atomicNumber}`}
                >
                  <div className="text-xs font-medium mb-1">{element.atomicNumber}</div>
                  <div className="text-3xl font-bold mb-1">{element.symbol}</div>
                  <div className="text-xs text-center truncate w-full">{element.name}</div>
                  <div className="text-lg mt-1">{element.emoji}</div>
                </button>
              ))}
            </div>

            {filteredElements.length === 0 && (
              <Card variant="outlined" className="p-12 text-center">
                <p className="text-gray-500 text-lg">No se encontraron elementos con esos filtros</p>
                <Button
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setStateFilter('all');
                  }}
                  className="mt-4"
                >
                  Limpiar Filtros
                </Button>
              </Card>
            )}
          </div>

          {/* Panel de detalles */}
          <div className="lg:col-span-1">
            {selectedElement ? (
              <Card variant="elevated" className="p-6 sticky top-4">
                <div className="text-center mb-6">
                  <div className="text-7xl mb-4">{selectedElement.emoji}</div>
                  <h2 className="text-3xl font-bold mb-2">{selectedElement.name}</h2>
                  <div className="text-5xl font-bold text-blue-600 mb-2">{selectedElement.symbol}</div>
                  <Badge variant="info" className="text-base">
                    Número Atómico: {selectedElement.atomicNumber}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Masa Atómica</div>
                    <div className="text-lg font-semibold">{selectedElement.atomicMass} u</div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Categoría</div>
                    <Badge className={getCategoryColor(selectedElement.category)}>
                      {getCategoryName(selectedElement.category)}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Estado Físico</div>
                    <div className="text-lg">
                      {getStateEmoji(selectedElement.state)} {getStateName(selectedElement.state)}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Grupo / Período</div>
                    <div className="text-lg font-semibold">
                      Grupo {selectedElement.group} / Período {selectedElement.period}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-600 mb-1">Configuración Electrónica</div>
                    <div className="text-base font-mono bg-gray-100 p-2 rounded">
                      {selectedElement.electronConfig}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="text-sm text-gray-600 mb-2">💡 Usos Cotidianos</div>
                    <p className="text-base">{selectedElement.uses}</p>
                  </div>
                </div>
              </Card>
            ) : (
              <Card variant="outlined" className="p-12 text-center sticky top-4">
                <FaFlask className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Selecciona un elemento para ver sus detalles</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
