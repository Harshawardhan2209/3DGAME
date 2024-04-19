import React from "react";
import ShimmerCards from "./ShimmerCards";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory.js"

const RestaurantMenu = () => {
  const { resId } = useParams();
  // custom hook
  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null || resInfo === undefined) return <ShimmerCards />;

  const { name, cuisines, costForTwo } = resInfo?.cards[2]?.card?.card?.info;

  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2].card?.card;

  const filteredCards =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  console.log(filteredCards);

  return (
    <div className="text-center">
      <div className="font-bold my-10">
        <h1 className="text-2xl">{name}</h1>
        <p className="text-lg my-2">
          {cuisines?.join(", ")}
        </p>
      </div>
        {filteredCards.map((item, index) => {
          return (
            <div key={index}>              
              <RestaurantCategory {...item.card.card}/>              
            </div>
          );          
        })}
    </div>
  );
};

export default RestaurantMenu;