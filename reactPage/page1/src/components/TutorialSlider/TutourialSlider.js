import React, { useState } from "react";
import arrow from "./images/arrow.svg";
import telegram from "./images/telegram.png";
import discord from "./images/discord.png";
import instagram from "./images/instagram.png";
import vk from "./images/vk.png";

import "./TutourialSlider.css";

export default function TutourialSlider({ changeVis }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [info, setInfo] = useState([
    {
      title: "Регистрация и пополнение баланса",
      link: "*как купить свою первую криптовалюту",
      listItems: [
        "Простая регистрация и подтверждение e-mail",
        "Покупка ставок в любой удобной популярной криптовалюте*, в разделе «баланс» в личном кабинете",
      ],
    },
    {
      title: "Размещение ставок и победа",
      link: null,
      listItems: [
        "Выбор понравившегося лота в разделе активные аукционы",
        "Размещение ставки на лот запускает таймер на 60 секунд",
        "Если в течение 60 секунд размещенная ставка была единственной, она считается победной",
        "Выигранный лот отобразится в разделе «выигранные лоты» в личном кабинете",
      ],
    },
    {
      title: "Получение выигрыша и повторное размещение",
      link: null,
      listItems: [
        "Для получения выигрыша, необходимо корректно заполнить раздел «доставка» в личном кабинете",
        "Победитель имеет возможность как получить сам товар, путем его отправки по указанному адресу, так и выставить его обратно на торги получив доход от размещенных ставок",
        "Соответствующий выбор делается в разделе «выигранные лоты» личного кабинета",
      ],
    },
    {
      title: "Благодарим за проявленный интерес к проекту Corcu.ru",
      link: null,
      listItems: [
        "Мы стремимся создать не только конкурентный продукт, но и верим, что наша уникальная механика в будущем сможет найти отражения во многих отраслях.",
      ],
    },
  ]);
  function checkPage(pageNumber, op) {
    if (pageNumber + op === -1) changeVis(false);
    if (pageNumber + op === 4) setCurrentPage(0);
    else setCurrentPage(pageNumber + op);
  }
  const title = function () {
    return (
      <h2 className="tutorial__slider-title">{info[currentPage].title}</h2>
    );
  };
  const itemsList = function () {
    return (
      <ul className="tutorial__list">
        {info[currentPage].listItems.map((el) => {
          console.log(el);
          if (currentPage == 3)
            return (
              <>
                <li className="tutorial__list-item">{el}</li>

                <Description />
              </>
            );
          return <li className="tutorial__list-item">{el}</li>;
        })}
      </ul>
    );
  };
  return (
    <div className="tutorial__slider">
      {title()}
      {itemsList()}

      {currentPage === 3 ? null : (
        <div className="tutorial__button-cont">
          {info[currentPage].link ? (
            <a className="tutorial__links" href="#">
              {info[currentPage].link}
            </a>
          ) : null}
          <button
            className="tutorial__button-arrow"
            onClick={() => checkPage(currentPage, -1)}
          >
            <img
              className="tutorial__btn-img--left"
              src={arrow}
              alt="arrow left"
            ></img>
          </button>
          <button
            className="tutorial__button-arrow"
            onClick={() => checkPage(currentPage, 1)}
          >
            <img
              className="tutorial__btn-img--rigth"
              src={arrow}
              alt="arrow rigth"
            ></img>
          </button>
        </div>
      )}
    </div>
  );
}

function Description() {
  return (
    <div className="tutorial__slider-description">
      <span className="tutorial__slider-text">
        Следите за новостями на наших страницах в социальных сетях
      </span>
      <div className="tutorial__social">
        <a>
          <img
            className="tutorial__social-link"
            src={instagram}
            alt="instagram"
          />
        </a>
        <a>
          <img className="tutorial__social-link" src={discord} alt="discord" />
        </a>
        <a>
          <img
            className="tutorial__social-link"
            src={telegram}
            alt="telegram"
          />
        </a>
        <a>
          <img
            className="tutorial__social-link"
            id="vk_icon"
            src={vk}
            alt="vk"
          />
        </a>
      </div>
      <span className="tutorial__slider-text">Удачи и грандиозных побед!</span>
      <span className="tutorial__slider-text">
        С <a className="tutorial__slider-link">CORCU.RU</a>
        <br /> каждая секунда окупится!
      </span>
      <div className="tutorial__button-cont tutorial__button-cont--full">
        <button className="tutorial__button-main">К АУКЦИОНАМ</button>
      </div>
    </div>
  );
}
