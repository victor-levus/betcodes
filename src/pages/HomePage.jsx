import React, { useState } from "react";
import moment from "moment/moment";

import BookInfo from "../components/bookInfo";
import _ from "lodash";
import BetDisplayCard from "../components/BetDisplayCard";
import PosterCard from "../components/chakra/PosterCard";
import { Heading } from "@chakra-ui/react";

const HomePage = () => {
  const [activeSelected, setActiveSelected] = useState("slide 4");
  const betData = [];
  const bookCodeData = "";

  const selectActive = (e) => {
    const name = e.target.id;
    setActiveSelected(name);
  };

  const loopBets = (matchDate) => {
    const filterData = _.filter(betData, function (o) {
      return (
        moment(o.match_time).format("L") ===
        moment().subtract(matchDate, "days").format("L")
      );
    });

    const sortData = [].concat(filterData);

    if (betData === "") {
      return <h6>LOADING...</h6>;
    } else {
      if (sortData.length == 0) {
        return <h6>There is No games on the selected date</h6>;
      }
      return sortData
        .sort((a, b) => (a.match_time > b.match_time ? -1 : 1))
        .map((item) => {
          return <BetDisplayCard key={item.id} item={item} />;
        });
    }
  };

  const bookCode = (ticketDate) => {
    const filterbookCode = _.filter(bookCodeData, function (o) {
      return (
        moment(o.ticket_date).format("L") ===
        moment().subtract(ticketDate, "days").format("L")
      );
    });

    if (filterbookCode.length != 0) {
      return filterbookCode[0].book_code;
    }
  };

  const bookOdd = (ticketDate) => {
    const filterbookCode = _.filter(bookCodeData, function (o) {
      return (
        moment(o.ticket_date).format("L") ===
        moment().subtract(ticketDate, "days").format("L")
      );
    });

    if (filterbookCode.length != 0) {
      return filterbookCode[0].total_odd;
    }
  };

  return (
    <>
      <div id="home--page">
        <div className="homePage--cover">
          <PosterCard
            text1="
            We provide 5 odds weekly that has high possibility of playing!!. Its
            absolutely free"
            text2="Stake only what you can lose"
          />

          <Heading color={"gray.400"} fontSize={"4xl"} marginY={10}>
            Fixture
          </Heading>

          <div className="">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="false"
            >
              <div className="matches--dates">
                <div className="others--days ">
                  {/* slide 1 */}
                  <span
                    id="slide 1"
                    onClick={selectActive}
                    className={`other--date ${
                      activeSelected === "slide 1" ? "active--date" : ""
                    }`}
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    aria-label="Slide 1"
                  >
                    <span
                      onClick={selectActive}
                      id="slide 1"
                      className="day--name"
                    >
                      {moment().subtract(3, "days").format("ddd")}
                    </span>
                    <span
                      onClick={selectActive}
                      id="slide 1"
                      className="day--date"
                    >
                      {moment().subtract(3, "days").format("DD MMM")}
                    </span>
                  </span>
                  {/* slide 2 */}
                  <span
                    id="slide 2"
                    onClick={selectActive}
                    className={`other--date ${
                      activeSelected === "slide 2" ? "active--date" : ""
                    }`}
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  >
                    <span
                      onClick={selectActive}
                      id="slide 2"
                      className="day--name"
                    >
                      {moment().subtract(2, "days").format("ddd")}
                    </span>
                    <span
                      onClick={selectActive}
                      id="slide 2"
                      className="day--date"
                    >
                      {moment().subtract(2, "days").format("DD MMM")}
                    </span>
                  </span>
                  {/* slide 3 */}
                  <span
                    onClick={selectActive}
                    id="slide 3"
                    className={`other--date ${
                      activeSelected === "slide 3" ? "active--date" : ""
                    }`}
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  >
                    <span
                      onClick={selectActive}
                      id="slide 3"
                      className="day--name"
                    >
                      {moment().subtract(1, "days").format("ddd")}
                    </span>
                    <span
                      onClick={selectActive}
                      id="slide 3"
                      className="day--date"
                    >
                      {moment().subtract(1, "days").format("DD MMM")}
                    </span>
                  </span>
                  {/* slide 4 */}
                  <span
                    id="slide 4"
                    onClick={selectActive}
                    className={`today--date-container ${
                      activeSelected === "slide 4" ? "active--date" : ""
                    }`}
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="3"
                    aria-current="true"
                    aria-label="Slide 4"
                  >
                    <span
                      onClick={selectActive}
                      id="slide 4"
                      className="day--name"
                    >
                      TODAY
                    </span>
                    <span
                      onClick={selectActive}
                      id="slide 4"
                      className="day--date"
                    >
                      {moment().format("DD MMM")}
                    </span>
                  </span>
                  {/* slide 5 */}
                  <span
                    id="slide 5"
                    onClick={selectActive}
                    className={`other--date ${
                      activeSelected === "slide 5" ? "active--date" : ""
                    }`}
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="4"
                    aria-label="Slide 5"
                  >
                    <span
                      onClick={selectActive}
                      id="slide 5"
                      className="day--name"
                    >
                      {moment().add(1, "days").format("ddd")}
                    </span>
                    <span
                      onClick={selectActive}
                      id="slide 5"
                      className="day--date"
                    >
                      {moment().add(1, "days").format("DD MMM")}
                    </span>
                  </span>
                  {/* sldie 6 */}
                  <span
                    id="slide 6"
                    onClick={selectActive}
                    className={`other--date ${
                      activeSelected === "slide 6" ? "active--date" : ""
                    }`}
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="5"
                    aria-label="Slide 6"
                  >
                    <span
                      onClick={selectActive}
                      id="slide 6"
                      className="day--name"
                    >
                      {moment().add(2, "days").format("ddd")}
                    </span>
                    <span
                      onClick={selectActive}
                      id="slide 6"
                      className="day--date"
                    >
                      {moment().add(2, "days").format("DD MMM")}
                    </span>
                  </span>
                  {/* slide 7 */}
                  <span
                    onClick={selectActive}
                    id="slide 7"
                    className={`other--date ${
                      activeSelected === "slide 7" ? "active--date" : ""
                    }`}
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="6"
                    aria-label="Slide 7"
                  >
                    <span
                      onClick={selectActive}
                      id="slide 7"
                      className="day--name"
                    >
                      {moment().add(3, "days").format("ddd")}
                    </span>
                    <span
                      onClick={selectActive}
                      id="slide 7"
                      className="day--date"
                    >
                      {moment().add(3, "days").format("DD MMM")}
                    </span>
                  </span>
                </div>
              </div>
              <div className="carousel-inner">
                {/* slide 1 */}
                <div className="carousel-item">
                  <div className="fixture-bets d-block w-100">
                    {loopBets(3)}
                  </div>
                  <BookInfo bookCode={bookCode(3)} bookOdd={bookOdd(3)} />
                </div>
                {/* slide 2 */}
                <div className="carousel-item">
                  <div className="fixture-bets d-block w-100">
                    {loopBets(2)}
                  </div>
                  <BookInfo bookCode={bookCode(2)} bookOdd={bookOdd(2)} />
                </div>
                {/* slide 3 */}
                <div className="carousel-item">
                  <div className="fixture-bets d-block w-100">
                    {loopBets(1)}
                  </div>
                  <BookInfo bookCode={bookCode(1)} bookOdd={bookOdd(1)} />
                </div>
                {/* slide 4 */}
                <div className="carousel-item active">
                  <div className="fixture-bets d-block w-100">
                    {loopBets(0)}
                  </div>
                  <BookInfo bookCode={bookCode()} bookOdd={bookOdd()} />
                </div>
                {/* slide 5 */}
                <div className="carousel-item">
                  <div className="fixture-bets d-block w-100">
                    {loopBets(-1)}
                  </div>
                  <BookInfo bookCode={bookCode(-1)} bookOdd={bookOdd(-1)} />
                </div>
                {/* slide 6 */}
                <div className="carousel-item">
                  <div className="fixture-bets d-block w-100">
                    {loopBets(-2)}
                  </div>
                  <BookInfo bookCode={bookCode(-2)} bookOdd={bookOdd(-2)} />
                </div>
                {/* slide 7 */}
                <div className="carousel-item">
                  <div className="fixture-bets d-block w-100">
                    {loopBets(-3)}
                  </div>
                  <BookInfo bookCode={bookCode(-3)} bookOdd={bookOdd(-3)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
