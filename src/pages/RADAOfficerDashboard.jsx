import { useEffect, useState } from "react";
import { ReadAllFarmers } from "../database/admin_service/read_farmers";
import { getAllProductListing } from "../database/admin_service/read_multi_products";
import { CreateMessage } from "../database/admin_service/create_message";

export const RADAOfficerDashboard = () => {
  const [farmerInfo, setfarmerInfo] = useState([]);
  const [productListing, setproductListing] = useState([]);
  const [message, setmessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const farmers = await ReadAllFarmers();
      const products = await getAllProductListing();
      setfarmerInfo(farmers);
      setproductListing(products);
    }

    fetchData();
    return;
  
  }, []);

  function handleOnChange(event) {
    setmessage(event.target.value);
  }

  async function handleMessageSubmit(e) {
    e.preventDefault();
    await CreateMessage({ message: message });
  }

  
  return <div>
    <form action="" onSubmit={handleMessageSubmit}>
      <input type="text" name="message" id="message" value={message} onChange={handleOnChange} />
      <button type="submit">Submit</button>
    </form>
  </div>;
};
