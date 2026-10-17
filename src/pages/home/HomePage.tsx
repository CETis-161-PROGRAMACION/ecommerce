import { useState } from "react";

import NavBar from "@/components/navbar/NavBar";
import photo1 from "../../assets/images/logo.png";
import photo2 from "../../assets/images/cft.png";
import photo3 from "../../assets/images/san.png";
import photo4 from "../../assets/images/dnm.png";
import photo5 from "../../assets/images/kundera_logo.png";
const productos = [
  { id: 1, nombre: "Producto 1", foto: photo1 },
  { id: 2, nombre: "Producto 2", foto: photo2 },
  { id: 3, nombre: "Producto 3", foto: photo3 },
  { id: 4, nombre: "Producto 4", foto: photo4 },
  { id: 5, nombre: "Producto 5", foto: photo5 },
];

export function HomePage() {
  const [actual, setActual] = useState(0);

  const anterior = () => {
    setActual((actual) =>
      actual === 0 ? productos.length - 1 : actual - 1
    );
  };

  const siguiente = () => {
    setActual((actual) =>
      actual === productos.length - 1 ? 0 : actual + 1
    );
  };

  return (
    <NavBar>
      <div className="p-8">
        <h1 className="mb-6 text-3xl font-bold">
          Mi carrusel de productos
        </h1>

        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-xl">
          <img
            src={productos[actual].foto}
            alt={productos[actual].nombre}
            className="h-96 w-full object-cover"
          />

          <button
            onClick={anterior}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-white"
          >
            ←
          </button>

          <button
            onClick={siguiente}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-4 py-2 text-white"
          >
            →
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {productos.map((producto, index) => (
              <button
                key={producto.id}
                onClick={() => setActual(index)}
                className={`h-3 w-3 rounded-full ${
                  actual === index ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <h2 className="mt-4 text-center text-xl font-semibold">
          {productos[actual].nombre}
        </h2>
      </div>
    </NavBar>
  );
}