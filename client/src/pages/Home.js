import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/get-user-info-by-id", {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <Layout>
    <h2>Homepage</h2>
  </Layout>;
}

export default Home;
