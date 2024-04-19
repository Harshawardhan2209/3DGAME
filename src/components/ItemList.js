import { CDN_URL } from "../utils/constants";

const orderPlaced = () => {
    alert("Order Placed");
}

const ItemList = (items) => {
  console.log(items);
  return (
    <div>
      {items.items.map((item) => {
        return (
          <div
            key={item.card.info.id}
            className="p-2 m-2 border-gray-300 border-b-2 text-left flex justify-between"
          >
            <div className="w-9/12 py-2">
              <div className="py-2">
                <div className="font-bold">{item.card.info.name}</div>
                <div>
                  ₹
                  {(item.card.info.defaultPrice
                    ? item.card.info.defaultPrice
                    : item.card.info.price) / 100}
                </div>
              </div>
              <p className="font-xs">{item.card.info.description}</p>
            </div>
            <div className="w-3/12">
            <div className="absolute">
                <button onClick={orderPlaced} className="bg-green-800 text-white m-1 px-2 py-1.5 rounded-md">
                  Add
                </button>
              </div>
              <img
                className="rounded-lg"
                alt="food-image"
                src={CDN_URL + item.card.info.imageId}
              ></img>              
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
