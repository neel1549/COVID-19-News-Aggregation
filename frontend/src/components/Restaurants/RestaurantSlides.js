import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const RestaurantSlides = ({ cleanedRestaurants }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 10;

  return (
    <div
      style={{
        padding: `0 ${chevronWidth}px`,
      }}
    >
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={3}
        gutter={10}
        leftChevron={<button>{"<"}</button>}
        rightChevron={<button>{">"}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {cleanedRestaurants.map((restaurant) => {
          return (
            <div>
              <div class="restcard">
                <div
                  class="header"
                  style={{
                    backgroundImage: `url(${restaurant.image})`,
                    imageRendering: "-webkit-optimize-contrast",
                    opacity: 1,
                  }}
                >
                  <div class="icon">
                    <a href="#">
                      <i class="fa fa-heart-o"></i>
                    </a>
                  </div>
                </div>
                <div class="text">
                  <p class="food" style={{ fontSize: 15, margin: "2px" }}>
                    {restaurant.name}
                  </p>
                  <i class="fa fa-clock-o"> Open Now</i>
                  <i class="fa fa-users"> Info Below</i>

                  <p class="info">
                    {restaurant.detail.map((item, index) => {
                      if (typeof item !== "object" && index != 3) {
                        return <div style={{ fontSize: 13 }}>{item}</div>;
                      }
                    })}
                    <a href={restaurant.detail[3]} class="btn">
                      Visit the Website
                    </a>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </ItemsCarousel>
    </div>
  );
};
export default RestaurantSlides;
