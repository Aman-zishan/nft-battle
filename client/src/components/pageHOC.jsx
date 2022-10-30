import React from "react";
import { useNavigate } from "react-router-dom";
import { logo, heroImg } from "../assets";
import { useGlobalContext } from "../context";
import styles from "../styles";
import { Alert } from "../components";

const pageHOC = (Component, title, description) => () => {
  const navigate = useNavigate();
  const { showAlert } = useGlobalContext();
  console.log(showAlert);
  return (
    <div className={styles.hocContainer}>
      {showAlert?.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
      <div className={styles.hocContentBox}>
        <img
          src={logo}
          alt="logo"
          className={styles.hocLogo}
          onClick={() => navigate("/")}
        />
        <div className={styles.hocBodyWrapper}>
          <div className="flex flex-row w-full">
            <h1 className={styles.headText}>{title}</h1>
          </div>
          <p className={styles.normalText}>{description}</p>
          <Component></Component>
        </div>
        <p className={styles.footerText}>Made with ❤️</p>
      </div>
      <div className="flex flex-1">
        <img
          src={heroImg}
          alt="hero-img"
          className="w-full xl:h-full object-cover "
        />
      </div>
    </div>
  );
};

export default pageHOC;
