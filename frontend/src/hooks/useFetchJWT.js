/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

const useFetchJWT = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const loadData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [url]);

  return { data, loading };
};

export default useFetchJWT;
