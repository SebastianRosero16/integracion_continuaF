import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza el encabezado de la aplicación", () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Colegio Mentes Creativas/i });
  expect(heading).toBeInTheDocument();
});