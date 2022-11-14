import React, { useEffect } from "react";
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
        <div className={styles.hocBodyWrapper}>
          <div className="flex flex-row w-full">
            <h1 className={styles.headText}>{title}</h1>
          </div>
          <p className={styles.normalText}>{description}</p>
          <Component></Component>
        </div>
        <p className={styles.footerText}>Inspired from Demon Slayer ❤️</p>
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
