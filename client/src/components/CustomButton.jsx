import React from "react";
import styles from "../styles";
import { playAudio } from "../utils/animation";
import { click } from "../assets";

const CustomButton = ({ title, handleClick, restStyles }) => {
  return (
    <button
      type="button"
      className={`${styles.btn} ${restStyles}`}
      onClick={() => {
        playAudio(click);
        handleClick();
      }}
    >
      {title}
    </button>
  );
};

export default CustomButton;
