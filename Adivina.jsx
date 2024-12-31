import React, { useState, useEffect } from "react";

const Adivina = () => {
  const emojis = ["🌶️", "🎮", "🍕", "🚀", "💣", "🔥"]; // Lista de emojis
  const [cartas, setCartas] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [parejasEncontradas, setParejasEncontradas] = useState([]);

  // Inicializar las cartas mezcladas
  const inicializarJuego = () => {
    const cartasDuplicadas = [...emojis, ...emojis] // Duplicar los emojis
      .sort(() => Math.random() - 0.5) // Mezclar aleatoriamente
      .map((emoji, index) => ({
        id: index,
        emoji,
        volteada: false,
        encontrada: false,
      }));
    setCartas(cartasDuplicadas);
    setSeleccionadas([]);
    setParejasEncontradas([]);
  };

  // Llamar a inicializarJuego cuando el componente se monta
  useEffect(() => {
    inicializarJuego();
  }, []);

  // Manejar la selección de cartas
  const manejarSeleccion = (id) => {
    if (seleccionadas.length < 2 && !cartas[id].volteada) {
      const nuevasCartas = cartas.map((carta) =>
        carta.id === id ? { ...carta, volteada: true } : carta
      );
      setCartas(nuevasCartas);
      setSeleccionadas((prev) => [...prev, id]);
    }
  };

  // Verificar coincidencias
  useEffect(() => {
    if (seleccionadas.length === 2) {
      const [primera, segunda] = seleccionadas;
      if (cartas[primera].emoji === cartas[segunda].emoji) {
        const nuevasCartas = cartas.map((carta) =>
          carta.id === primera || carta.id === segunda
            ? { ...carta, encontrada: true }
            : carta
        );
        setCartas(nuevasCartas);
        setParejasEncontradas((prev) => [...prev, cartas[primera].emoji]);
      } else {
        setTimeout(() => {
          const nuevasCartas = cartas.map((carta) =>
            carta.id === primera || carta.id === segunda
              ? { ...carta, volteada: false }
              : carta
          );
          setCartas(nuevasCartas);
        }, 1000);
      }
      setSeleccionadas([]);
    }
  }, [seleccionadas, cartas]);

  return (
    <>
      <h1>Juego de Memoria</h1>
      <div className="container">
        <div className="tablero">
          {cartas.map((carta) => (
            <div
              key={carta.id}
              className={`carta ${carta.volteada ? "volteada" : ""} ${
                carta.encontrada ? "encontrada" : ""
              }`}
              onClick={() => manejarSeleccion(carta.id)}
            >
              {carta.volteada || carta.encontrada ? carta.emoji : "❓"}
            </div>
          ))}
        </div>
      </div>
      <div className="parejas">
        <h2>Parejas encontradas: {parejasEncontradas.length}</h2>
        {parejasEncontradas.length === emojis.length && (
          <button className="iniciar" onClick={inicializarJuego}>Reiniciar Juego</button>
        )}
      </div>
    </>
  );
};

export default Adivina;



