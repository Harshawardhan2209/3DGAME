import React from "react";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  return (
    <div className="p-4 m-4 rounded-lg bg-slate-600 hover:bg-slate-800 text-white w-[250px]">
      <img
        className="rounded-lg"
        alt="food-image"
        src={CDN_URL+resData?.info?.cloudinaryImageId}
      ></img>
      <h3 className="font-bold py-3 text-lg">{resData.info.name}</h3>
      <h4>{resData.info.cuisines.join(", ")}</h4>
      <h4>{resData.info.costForTwo}</h4>
      <h4>{resData.info.sla.deliveryTime} minutes</h4>
      <h4>{resData.info.avgRating + " star"}</h4>
    </div>
  );
};

export const withVegLabel = (RestaurantCard) => {
  return (props) => {
    return(
      <div>
        <label className="absolute bg-green-700 text-white m-2 px-3 py-1.5 rounded-md">
          Veg
        </label>
        <RestaurantCard {...props}/>
      </div>
    );
  }
};

export default RestaurantCard;
