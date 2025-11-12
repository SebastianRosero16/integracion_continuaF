import { useEffect, useState } from "react";

export default function ClickCounter() {
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem("click-counter");
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("click-counter", count.toString());
  }, [count]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-2xl font-bold">Contador de Clics</h1>
      <p className="text-lg">
        Has hecho clic: <span className="font-bold" aria-live="polite">{count}</span> veces
      </p>
      <button
        onClick={() => setCount(prev => prev + 1)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        aria-label="Incrementar contador de clics"
        aria-describedby="click-count-display"
      >
        Haz clic aquí
      </button>
    </div>
  );
}
