import React from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CoronaChart from "../CoronaChart/CoronaChart";
import countyList from "../../assets/CountyList";
import NewsAPI from "../NewsAPI/NewsAPI";
import SideNavBar from "../SideNav/SideNavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./HomeScreen.css";
import { Animated } from "react-animated-css";
import RestaurantDisplay from "../Restaurants/RestaurantDisplay";
import VideoDetail from "../Video/VideoDetail";
import VideoList from "../Video/VideoList";
import youtube from "../Video/youtube";
import TestingMap from "../Testing/TestingMap";

const splash = require("../../assets/images/steven-lewis-n2HWdwFywcQ-unsplash.jpg");
const news = require("../../assets/images/juliana-malta-Uy0Bq8vYjk4-unsplash.jpg");
const rest = require("../../assets/images/siyuan-g_V2rt6iG7A-unsplash.jpg");
const gov = require("../../assets/images/daniel-leone-v7daTKlZzaw-unsplash.jpg");
const test = require("../../assets/images/macau-photo-agency-Rv3QXYUwiWw-unsplash.jpg");
const keys = require("../../api_keys/keys");

const mystyle = {
  background: "linear-gradient(to right, #430089, #82ffa1)",
};

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedCounty: "", status: 0, data: [] };
    this.section1 = React.createRef();
  }

  onSearchSubmit = async (search) => {
    const response = await youtube.get("/search", {
      params: {
        part: "snippet",
        type: "video",
        maxResults: 8,
        key: keys.keys.youtubeKey,
        q: search,
        order: "date",
      },
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  onVideoSelect = (video) => {
    this.setState({ selectedVideo: video });
  };

  componentDidMount() {
    axios
      .get(
        "https://amazingshellyyy.com/covid19-api/US-CA/countyTimeseries.json"
      )
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    this.onSearchSubmit("gavin newsom press conference today");
  }

  countySelect = (event) => {
    this.setState({ selectedCounty: event.currentTarget.textContent });
    this.renderCountyList();
  };

  renderCountyList() {
    return countyList.map((county, i) => {
      return (
        <Dropdown.Item key={i} onClick={this.countySelect}>
          {county}
        </Dropdown.Item>
      );
    });
  }

  renderCoronaChart() {
    if (this.state.selectedCounty != "") {
      return (
        <div>
          <CoronaChart
            key={this.state.selectedCounty}
            selectedCounty={this.state.selectedCounty}
            data={this.state.data}
          />
        </div>
      );
    }
  }
  render() {
    if (this.state.selectedCounty.length == 0) {
      return (
        <div>
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={true}
          >
            <div
              className="jumbotron"
              style={{
                backgroundImage: `url(${splash})`,
                backgroundSize: "cover",
                height: "100vh",
                border: "1px solid",
              }}
            >
              <div className="container">
                <div
                  className="jumbotron"
                  style={{
                    position: "absolute",
                    left: "30%",
                    top: "30%",
                    background: "transparent",
                  }}
                >
                  <h1
                    style={{
                      fontFamily: "cursive",
                      opacity: 0.5,
                      color: "white",
                      fontSize: "60px",
                      fontWeight: "lighter",
                    }}
                  >
                    COVID-19 Utility Guide
                  </h1>
                  <h2
                    style={{
                      fontFamily: "cursive",
                      opacity: 0.5,
                      color: "white",
                      fontSize: "40px",
                      fontWeight: "lighter",
                    }}
                  >
                    Select a county in CA
                  </h2>
                </div>
              </div>
              <div
                className="nav-container"
                style={{ backgroundColor: "#061938" }}
              >
                <DropdownButton
                  id="dropdown-menu-align-right"
                  id="dropdown-basic-button"
                  boundary="window"
                  style={{
                    position: "absolute",
                    left: "88%",
                    opacity: 0.7,
                    maxHeight: "100px",
                  }}
                  title="California Counties"
                >
                  {this.renderCountyList()}
                </DropdownButton>
              </div>
            </div>
          </Animated>
        </div>
      );
    }

    return (
      <div>
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationInDuration="5000"
        >
          <SideNavBar restRef={this.section1} />
        </Animated>
        <Animated animationIn="fadeIn" animationOut="fadeOut">
          <SideNavBar style={{ zIndex: 5 }} restRef={this.section1} />
          <div
            className="jumbotron"
            style={{
              backgroundImage: `url(${splash})`,
              backgroundSize: "cover",
              height: "850px",
              backgroundSize: "100%",
            }}
          >
            <DropdownButton
              id="dropdown-menu-align-right"
              id="dropdown-basic-button"
              style={{ position: "absolute", left: "88%", opacity: 0.7 }}
              title="California Counties"
            >
              {this.renderCountyList()}
            </DropdownButton>
            <h1
              style={{
                fontFamily: "cursive",
                opacity: 0.5,
                position: "absolute",
                left: "20%",
                top: "20%",
                color: "white",
                fontSize: "60px",
                fontWeight: "lighter",
              }}
            >
              {this.state.selectedCounty + " County"}
            </h1>
          </div>
        </Animated>

        <div
          style={{
            backgroundImage: `url(${splash})`,
            backgroundSize: "cover",
            height: "860px",
            backgroundSize: "100%",
          }}
          className="content"
        >
          <div className="container">
            <h2 class="ui icon header">
              <i class="chart bar icon"></i>
              <div class="content">
                COVID-19 Case Statistics
                <div class="sub header"></div>
              </div>
            </h2>
            {this.renderCoronaChart()}
          </div>
        </div>

        <div
          className="jumbotron"
          style={{
            height: "850px",
            backgroundColor: "#bdd4e7",
            backgroundImage: `url(${news})`,
            backgroundSize: "cover",
          }}
        >
          <div className="container">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <h2 class="ui icon header">
                  <i class="newspaper icon"></i>
                  <div class="content">
                    Relevant News
                    <div class="sub header"></div>
                  </div>
                </h2>
              </div>
              <div>
                <ul style={{ position: "absolute", right: 0 }}>
                  <li>
                    <a href="#">
                      <h2>Click and scroll to learn more!</h2>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              style={{
                overflow: "auto",
                maxHeight: "650px",
              }}
            >
              <NewsAPI
                key={this.state.selectedCounty}
                selectedCounty={this.state.selectedCounty}
              />
            </div>
          </div>
        </div>

        <div
          className="jumbotron"
          style={{
            backgroundImage: `url(${rest})`,
            backgroundSize: "cover",
            height: "850px",
          }}
        >
          <h2
            class="ui icon header"
            style={{
              marginLeft: 150,
              marginTop: 25,
              marginBottom: 40,
              color: "white",
            }}
          >
            <i class="lock open icon"></i>
            <div class="content">
              Open Restaurants
              <div class="sub header"></div>
            </div>
          </h2>
          <RestaurantDisplay
            ref={this.section1}
            key={this.state.selectedCounty.length}
            county={this.state.selectedCounty}
          />
        </div>

        <div
          style={{
            backgroundImage: `url(${gov})`,
            backgroundSize: "cover",
            height: "850px",
          }}
        >
          <h2
            class="ui icon header"
            style={{
              marginLeft: 150,
              marginTop: 25,
              marginBottom: 40,
              color: "white",
            }}
          >
            <i class="play circle outline icon"></i>
            <div class="content">
              Governor Livestreams
              <div class="sub header"></div>
            </div>
          </h2>
          <Container fluid style={{ marginLeft: 180 }}>
            <Row>
              <Col>
                <div>
                  <VideoDetail video={this.state.selectedVideo}></VideoDetail>
                </div>
              </Col>
              <Col>
                <div
                  style={{
                    overflow: "auto",
                    maxHeight: 500,
                  }}
                >
                  <VideoList
                    videos={this.state.videos}
                    onVideoSelect={this.onVideoSelect}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div
          className="jumbotron"
          style={{
            backgroundImage: `url(${test})`,
            backgroundSize: "cover",
            height: "850px",
          }}
        >
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
                <h2
                  class="ui icon header"
                  style={{
                    marginLeft: 150,
                    marginTop: 25,
                    marginBottom: 40,
                    color: "white",
                  }}
                >
                  <i class="map icon"></i>
                  <div class="content">
                    Testing Sites
                    <div class="sub header"></div>
                  </div>
                </h2>
              </div>
              <div>
                <ul style={{ position: "absolute", right: 0 }}>
                  <li>
                    <a href="#">
                      <h2>Click/scroll on the map or list to learn more!</h2>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <TestingMap />
          </div>
        </div>
      </div>
    );
  }
}
