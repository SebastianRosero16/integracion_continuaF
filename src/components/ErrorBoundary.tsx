import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * ErrorBoundary para capturar errores de React
 * Evita que toda la aplicación se rompa por un error en un componente
 * 
 * @example
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Actualizar el estado para mostrar el UI fallback
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Registrar el error en consola (en producción, enviar a servicio de logging)
    console.error('ErrorBoundary capturó un error:', error);
    console.error('ComponentStack:', errorInfo.componentStack);

    // Actualizar estado con información detallada del error
    this.setState({
      error,
      errorInfo,
    });
  }

  private handleReload = (): void => {
    // Recargar la página para intentar recuperarse del error
    window.location.reload();
  };

  private handleGoHome = (): void => {
    // Navegar al home y resetear el error
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Si hay un fallback personalizado, usarlo
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // UI por defecto cuando hay un error
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              {/* Icono de error */}
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              {/* Título */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Ups! Algo salió mal
              </h1>

              {/* Descripción */}
              <p className="text-gray-600 mb-6">
                Ha ocurrido un error inesperado. No te preocupes, tu información está segura.
              </p>

              {/* Detalles del error (solo en desarrollo) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 text-left bg-gray-50 rounded-lg p-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                    Detalles técnicos del error
                  </summary>
                  <div className="space-y-2">
                    <div className="text-xs">
                      <strong className="text-red-600">Error:</strong>
                      <pre className="mt-1 text-red-700 whitespace-pre-wrap break-words">
                        {this.state.error.toString()}
                      </pre>
                    </div>
                    {this.state.errorInfo && (
                      <div className="text-xs">
                        <strong className="text-red-600">Stack:</strong>
                        <pre className="mt-1 text-gray-600 whitespace-pre-wrap break-words text-[10px]">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={this.handleReload}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Recargar página
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Ir al inicio
                </button>
              </div>

              {/* Mensaje de ayuda */}
              <p className="mt-6 text-sm text-gray-500">
                Si el problema persiste, por favor contacta al soporte técnico.
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Si no hay error, renderizar los children normalmente
    return this.props.children;
  }
}

export default ErrorBoundary;
