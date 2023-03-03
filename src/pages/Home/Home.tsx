import React, { useState, useEffect } from "react";
import HeaderImg from "../../assets/header-img.svg";

import "./Home.scss";
const sentences = [
  "Revisa los vuelos de llegada y salidas",
  "Puedes visualizarlos en tiempo real.",
];
const Home = () => {
  const [text, setText] = useState("");
  const [blink, setBlink] = useState(true);
  const [currentSentence, setCurrentSentence] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const sentence = sentences[currentSentence];
      setText((prevText) =>
        prevText.length < sentence.length
          ? sentence.slice(0, prevText.length + 1)
          : prevText
      );
    }, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentSentence]);

  useEffect(() => {
    const cursorIntervalId = setInterval(() => {
      setBlink((prevBlink) => !prevBlink);
    }, 500);

    return () => {
      clearInterval(cursorIntervalId);
    };
  }, []);

  useEffect(() => {
    if (text === sentences[currentSentence]) {
      setTimeout(() => {
        setCurrentSentence((prevSentence) =>
          prevSentence === sentences.length - 1 ? 0 : prevSentence + 1
        );
        setText("");
      }, 1000);
    }
  }, [text, currentSentence]);

  return (
    <div className="container d-flex justify-content-center aling-items-center text-white gap-5">
      <div className="col-md-6 flex-column mt-5">
        <div className="typing-animation">
          <span>{text}</span>
          <div className={`cursor${blink ? " blink" : ""}`}></div>
        </div>
        <p>
          ¡Bienvenido al aeropuerto! ¿Estás esperando a alguien o deseas seguir
          su vuelo? Manténte actualizado con la información de llegadas y
          salidas en tiempo real en nuestro panel de información. Con solo unos
          click, podrás conocer el estado de los vuelos, los horarios de
          llegadas y salidas, y cualquier cambio en la programación. ¡Viajar
          nunca ha sido tan fácil!
        </p>
      </div>
      <div className="col-md-6">
        <img
          className="img-fluid animation-scss"
          src={HeaderImg}
          alt="Header-img"
        />
      </div>
      <div className="position-absolute bottom-0 start-50 translate-middle-x text-white">
        <p>
          Creado por{" "}
          <a
            href="https://Github.com/JuanOsccoMori"
            target="_blank"
            rel="noreferrer"
          >
            @Juan
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
