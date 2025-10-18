import React, { useEffect, useState } from "react";
import { FetchAllProduct } from "../database/product_service/read_multi_product";

export const MarketPlace = () => {
  const [cropData, setcropData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await FetchAllProduct();
      console.log(data);
      setcropData(data);
      return;
    }

    fetchData();
    return;
  
  }, []);

  console.log("Hello", cropData);

  
  return <div>MarketPlace</div>;
};
