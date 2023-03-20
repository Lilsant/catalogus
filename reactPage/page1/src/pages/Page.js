import React, { useState } from "react";
import TutourialSlider from "./components/TutourialSlider";
import logo from "./logo.png";
import "./Page.css";

export default function Page() {
  const [isBtnClicked, setIsBtnClicked] = useState(false);
  return (
    <div className="tutorial">
      <div className="container">
        <div className="tutorial__inner">
          <img className="tutorial__logo" src={logo} alt="logo" />
          {isBtnClicked ? (
            <TutourialSlider changeVis={setIsBtnClicked} />
          ) : (
            <>
              <div className="tutorial__description">
                <span className="tutorial__description-number">№1</span>
                <span className="tutorial__description-text">
                  аукционный дом RL-NFT*
                </span>
              </div>
              <h3 className="tutorial__title">Формула победы</h3>
              <div className="tutorial__form">
                <span className="tutorial__form-text">60₽</span>
                <span className="tutorial__form-operator">+</span>
                <span className="tutorial__form-text">60 сек.</span>
                <span className="tutorial__form-operator">=</span>
                <span className="tutorial__form-text">RL-NFT*</span>
              </div>
              <button
                onClick={() => setIsBtnClicked(true)}
                className="tutorial__button"
              >
                ВПЕРЕД!
              </button>
              <a className="tutorial__link" href="#">
                *Что такое RL-NFT
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
