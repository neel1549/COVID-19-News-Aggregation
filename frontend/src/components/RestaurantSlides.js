import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";

const RestaurantSlides = ({ cleanedRestaurants }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 10;
  console.log("hello");

  return (
    <div
      style={{
        padding: `0 ${chevronWidth}px`,
      }}
    >
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={4}
        gutter={20}
        leftChevron={<button>{"<"}</button>}
        rightChevron={<button>{">"}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
        {cleanedRestaurants.map((restaurant) => {
          console.log(restaurant);
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
                  <h1 class="food">{restaurant.name}</h1>
                  <i class="fa fa-clock-o"> Open Now</i>
                  <i class="fa fa-users"> Serves 2</i>

                  <p class="info">
                    {restaurant.detail.map((item) => {
                      if (typeof item === "object") {
                        var typeString = "";
                        for (var key in item) {
                          if (item[key]) {
                            typeString += key + "/";
                          }
                        }
                        return (
                          <a href="#" class="btn">
                            {typeString.substring(0, typeString.length - 1)}
                          </a>
                        );
                      } else {
                        return <div>{item}</div>;
                      }
                    })}
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
