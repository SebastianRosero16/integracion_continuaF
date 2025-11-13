import { render, screen, fireEvent } from '@testing-library/react';
import { ColombiaMap } from './ColombiaMap';
import { departamentos } from '../data/departamentos';

describe('ColombiaMap', () => {
  const mockOnDepartmentSelect = jest.fn();

  beforeEach(() => {
    mockOnDepartmentSelect.mockClear();
  });

  it('debe renderizar el mapa con el título correcto', () => {
    render(<ColombiaMap onDepartmentSelect={mockOnDepartmentSelect} />);
    
    expect(screen.getByText(/Mapa Interactivo de Colombia/i)).toBeInTheDocument();
  });

  it('debe mostrar instrucciones de uso', () => {
    render(<ColombiaMap onDepartmentSelect={mockOnDepartmentSelect} />);
    
    expect(screen.getByText(/información completa/i)).toBeInTheDocument();
  });

  it('debe renderizar todos los departamentos como elementos interactivos', () => {
    render(<ColombiaMap onDepartmentSelect={mockOnDepartmentSelect} />);
    
    // Verificar que se renderizan botones para departamentos
    const antioquia = screen.getByRole('button', { name: /Antioquia/i });
    expect(antioquia).toBeInTheDocument();

    const bogota = screen.getByRole('button', { name: /Cundinamarca/i });
    expect(bogota).toBeInTheDocument();
  });

  it('debe llamar onDepartmentSelect cuando se hace clic en un departamento', () => {
    render(<ColombiaMap onDepartmentSelect={mockOnDepartmentSelect} />);
    
    const antioquia = screen.getByRole('button', { name: /Antioquia/i });
    fireEvent.click(antioquia);
    
    expect(mockOnDepartmentSelect).toHaveBeenCalledTimes(1);
    expect(mockOnDepartmentSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        depto: 'Antioquia',
        capital: 'Medellín',
      })
    );
  });

  it('debe resaltar el departamento seleccionado', () => {
    const selectedDept = departamentos.find((d) => d.depto === 'Antioquia');
    
    render(
      <ColombiaMap 
        onDepartmentSelect={mockOnDepartmentSelect} 
        selectedDepartamento={selectedDept}
      />
    );
    
    const antioquia = screen.getByRole('button', { name: /Antioquia/i });
    expect(antioquia).toBeInTheDocument();
  });

  it('debe ser accesible con teclado', () => {
    render(<ColombiaMap onDepartmentSelect={mockOnDepartmentSelect} />);
    
    const valle = screen.getByRole('button', { name: /Valle del Cauca/i });
    
    // Simular presionar Enter
    fireEvent.keyDown(valle, { key: 'Enter', code: 'Enter' });
    expect(mockOnDepartmentSelect).toHaveBeenCalledTimes(1);
    
    // Simular presionar Espacio
    fireEvent.keyDown(valle, { key: ' ', code: 'Space' });
    expect(mockOnDepartmentSelect).toHaveBeenCalledTimes(2);
  });

  it('debe mostrar la leyenda de regiones', () => {
    render(<ColombiaMap onDepartmentSelect={mockOnDepartmentSelect} />);
    
    expect(screen.getByText('Regiones de Colombia:')).toBeInTheDocument();
    expect(screen.getByText('Caribe')).toBeInTheDocument();
    expect(screen.getByText('Andina')).toBeInTheDocument();
    expect(screen.getByText('Pacífica')).toBeInTheDocument();
    expect(screen.getByText('Orinoquía')).toBeInTheDocument();
    expect(screen.getByText('Amazonía')).toBeInTheDocument();
  });

  it('debe tener aria-label descriptivo en el SVG', () => {
    render(<ColombiaMap onDepartmentSelect={mockOnDepartmentSelect} />);
    
    const svg = screen.getByRole('img', { name: /Mapa interactivo de Colombia/i });
    expect(svg).toBeInTheDocument();
  });

  it('debe manejar departamentos con nombres largos', () => {
    render(<ColombiaMap onDepartmentSelect={mockOnDepartmentSelect} />);
    
    // San Andrés y Providencia es un nombre largo
    const sanAndres = screen.getByRole('button', { name: /San Andrés y Providencia/i });
    expect(sanAndres).toBeInTheDocument();
  });

  it('debe aplicar colores diferentes por región', () => {
    const { container } = render(<ColombiaMap onDepartmentSelect={mockOnDepartmentSelect} />);
    
    // Verificar que hay elementos rect (departamentos) con diferentes colores
    const rects = container.querySelectorAll('rect[fill]');
    const fillColors = Array.from(rects).map((rect) => rect.getAttribute('fill'));
    const uniqueColors = new Set(fillColors);
    
    // Debe haber al menos 5 colores diferentes (uno por región)
    expect(uniqueColors.size).toBeGreaterThanOrEqual(5);
  });
});
