import React, { useEffect, useState } from "react";
import RestaurantCard, { withVegLabel } from "./RestaurantCard";
import ShimmerCards from "./ShimmerCards";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const onlineStatus = useOnlineStatus();
  const VegRestaurantCard = withVegLabel(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.61610&lng=73.72860&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const restaurant = await data.json();
    const filtered = restaurant?.data?.cards?.filter(
      (element) => element.card.card.id === "top_brands_for_you"
    );
    setRestaurantList(
      filtered[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurantList(
      filtered[0]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  console.log(filteredRestaurantList);

  return restaurantList?.length === 0 ? (
    <ShimmerCards />
  ) : !onlineStatus ? (
    <div>
      <h2>You are offline</h2>
    </div>
  ) : (
    <div>
      <div className="px-20 py-4 m-2 space-x-5">
        <input
          className="border border-solid border-black rounded-md focus:ring-2"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        ></input>
        <button
          className="px-4 py-2 bg-red-700 rounded-lg  text-white"
          onClick={() => {
            const filteredList = restaurantList.filter((res) =>
              res?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurantList(filteredList);
          }}
        >
          Search
        </button>
        <button
          className="px-4 py-2 bg-red-700 rounded-lg  text-white"
          onClick={() => {
            setFilteredRestaurantList(
              filteredRestaurantList?.filter((res) => res.info.avgRating > 4.0)
            );
          }}
        >
          Top Restaurants
        </button>
      </div>
      <div className="flex flex-wrap px-14">
        {filteredRestaurantList?.map((res) => (
          <Link key={res?.info?.id} to={"restaurant/" + res?.info?.id}>
            {res.info.veg ? (
              <VegRestaurantCard resData={res}/>
            ) : (
              <RestaurantCard resData={res} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
