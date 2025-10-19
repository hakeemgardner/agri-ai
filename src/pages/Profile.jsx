import React, { useEffect, useState } from "react";
import { ReadCurrentUser } from "../database/farmer_service/read_current_farmer";

export const Profile = () => {
  const [userInfo, setuserInfo] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      const user = await ReadCurrentUser();
      setuserInfo(user);
    }
    fetchData();

    return;
  }, [])
  
  return (
    <div>
      <h1 className="">Profile</h1>
    </div>
  );
};
