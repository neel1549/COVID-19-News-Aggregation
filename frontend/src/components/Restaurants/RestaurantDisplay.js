import React from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "./RestaurantDisplay.css";
import ItemsCarousel from "react-items-carousel";
import RestaurantSlides from "./RestaurantSlides";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

export default class RestaurantDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      restaurants: [],
      flag: false,
      county: "",
      filterSelect: "",
      restaurantFound: false,
    };

    axios
      .get("https://covid19aggregation.web.app/restaurants", {
        crossDomain: true,
        params: {
          county: this.props.county,
        },
      })
      .then((res) => {
        this.setState({ restaurants: res.data });

        this.setState({ flag: true });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  handleScrollToElement(event) {
    window.scrollTo(0, this.myRef.current.offsetTop);
  }

  parseRestData() {
    var aggregateRestaurants = [];
    for (var i = 0; i < this.state.restaurants.names.length; i++) {
      aggregateRestaurants.push({
        name: this.state.restaurants.names[i],
        image: this.state.restaurants.images[i],
        detail: this.state.restaurants.details[i],
      });
    }
    return aggregateRestaurants;
  }
  filter(restaurants) {
    var filteredRestaurants = [];

    restaurants.forEach((restaurant) => {
      var info = restaurant.detail.slice(-1)[0];
      for (var key of Object.keys(info)) {
        if (
          key.includes(this.state.filterSelect.substring(0, 3)) &&
          info[key]
        ) {
          filteredRestaurants.push(restaurant);
        }
      }
    });

    return filteredRestaurants;
  }

  filterSelect = (event) => {
    this.setState({ filterSelect: event.currentTarget.textContent });
  };

  renderRestaurantCards() {
    if (this.state.flag) {
      var cleanedRestaurants = this.parseRestData(this.state.restaurants);

      if (
        this.state.filterSelect.length !== 0 &&
        this.state.filterSelect !== "All"
      ) {
        cleanedRestaurants = this.filter(cleanedRestaurants);
      }
      return (
        <div>
          <RestaurantSlides cleanedRestaurants={cleanedRestaurants} />
        </div>
      );
    }
  }

  render() {
    if (this.state.flag === false) {
      return (
        <div
          class="ui segment"
          style={{
            width: "100px",
            height: "100px",
            position: "absolute",
            left: "40%",
            background: "transparent",
          }}
        >
          <p></p>
          <div class="ui active dimmer">
            <div class="ui text loader"> Collecting Restaurant Data..</div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
          <div className="row"></div>
          <br />

          {this.renderRestaurantCards()}
        </div>
      </div>
    );
  }
}
