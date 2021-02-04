import React from "react";
import Nav from "./Nav";
import "./HomeScreen.css";
import Banner from "./Banner";
import Row from "./Row";
import requests from "../requests";
function HomeScreen() {
  return (
    <div className="homescreen">
      <Nav />
      <Banner />

      <Row
        title="Netflix Origials"
        fetchUrl={requests.fetchNetflixOriginals}
        isLarge
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
    </div>
  );
}

export default HomeScreen;
