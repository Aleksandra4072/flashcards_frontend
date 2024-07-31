import { useEffect, useState } from "react";
import { notification } from "antd";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import BundleCard from "../components/common/BundleCard";

import styles from "../css/pages/Home.module.css";

const openNotification = (message, type) => {
  notification[type]({
    message,
  });
};

const Home = () => {
  const axiosPrivate = useAxiosPrivate();
  const [bundles, setBundles] = useState([]);

  const fetchBundles = async () => {
    try {
      const result = await axiosPrivate.get("/bundle");
      if (result?.data) {
        setBundles(result.data.bundles);
      } else {
        openNotification("You do not have any bundles yet", "info");
      }
    } catch (e) {
      openNotification(e.response.data.detail, "error");
    }
  };

  useEffect(() => {
    fetchBundles();
  }, []);

  return (
    <div className={styles.page}>
      {bundles.map((bundle) => (
        <BundleCard
          key={bundle.id}
          id={bundle.id}
          title={bundle.title}
          description={bundle.description}
          fetchBundles={fetchBundles}
        />
      ))}
    </div>
  );
};

export default Home;
