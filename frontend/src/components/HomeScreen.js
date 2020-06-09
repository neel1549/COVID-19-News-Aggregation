import React from "react";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import CoronaChart from "./CoronaChart";
import countyList from "../assets/CountyList";
import NewsAPI from "./NewsAPI";
import SideNavBar from "./SideNavBar";
import { Button, Header, Image, Modal, Icon } from "semantic-ui-react";
import "./HomeScreen.css";
import { Animated } from "react-animated-css";
import RestaurantDisplay from "./RestaurantDisplay";
import Col from "react-bootstrap/Col";

const splash = require("../assets/images/steven-lewis-n2HWdwFywcQ-unsplash.jpg");
const news = require("../assets/images/juliana-malta-Uy0Bq8vYjk4-unsplash.jpg");
const rest = require("../assets/images/siyuan-g_V2rt6iG7A-unsplash.jpg");
const mystyle = {
  background: "linear-gradient(to right, #430089, #82ffa1)",
};

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedCounty: "", status: 0, data: [] };
    this.section1 = React.createRef();
  }

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
          <SideNavBar restRef={this.section1} />
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
            background: "linear-gradient(315deg, #ffffff 0%, #d7e1ec  74%)",
          }}
        >
          <div className="container">
            <h2 class="ui icon header">
              <i class="newspaper icon"></i>
              <div class="content">
                Relevant News
                <div class="sub header"></div>
              </div>
            </h2>

            <NewsAPI
              key={this.state.selectedCounty}
              selectedCounty={this.state.selectedCounty}
            />
          </div>
        </div>

        <div
          className="jumbotron"
          style={{
            backgroundImage: `url(${rest})`,
            backgroundSize: "cover",
            height: "850px",
            backgroundSize: "100%",
          }}
        >
          <RestaurantDisplay
            ref={this.section1}
            key={this.state.selectedCounty.length}
            county={this.state.selectedCounty}
          />
        </div>
      </div>
    );
  }
}
