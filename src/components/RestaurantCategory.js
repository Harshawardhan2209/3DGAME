import { useState } from "react";
import ItemList from "./ItemList";
import { GoChevronUp, GoChevronDown } from "react-icons/go";

const RestaurantCategory = (data) => {
  const [showItemCards, setShowItemCards] = useState(false);

  const handleClick = () => {
    setShowItemCards(!showItemCards);
  };

  return (
    <div className="w-8/12 bg-gray-250 shadow-2xl p-6 mx-auto my-4">
      <div className="flex justify-between" onClick={handleClick}>
        <span className="font-bold text-lg">
          {data.title} ({data.itemCards.length})
        </span>
        <span>{showItemCards ? <GoChevronUp /> : <GoChevronDown />}</span>
      </div>
      {showItemCards && <ItemList items={data.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
