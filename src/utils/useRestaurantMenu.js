import { useEffect, useState } from "react";
import { MENU_URL } from "../utils/constants";

const useRestaurantMenu = (resId) => {
    const[resInfo, setResInfo] = useState(null);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch(MENU_URL + resId);
        const json = await response.json();
        setResInfo(json.data);
    };

    return resInfo;
}

export default useRestaurantMenu;