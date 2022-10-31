import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles";
import { pageHOC, CustomButton, CustomInput, GameLoad } from "../components";
import { useGlobalContext } from "../context";
import { playAudio } from "../utils/animation.js";
import { join } from "../assets";

const CreateBattle = () => {
  const [waitBattle, setWaitBattle] = useState(false);
  const { contract, battleName, setBattleName, gameData } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
  }, [gameData]);

  const handleClick = async () => {
    if (!battleName || !battleName.trim()) return null;
    try {
      await contract.createBattle(battleName);
      setWaitBattle(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {waitBattle && <GameLoad />}
      <div className="flex flex-col mb-5">
        <CustomInput
          Label="Battle"
          placeholder="Enter battle name"
          value={battleName}
          handleValueChange={setBattleName}
        ></CustomInput>
        <CustomButton
          title="Create Battle"
          handleClick={handleClick}
          restStyles="mt-6"
        ></CustomButton>
      </div>
      <p
        className={styles.infoText}
        onClick={() => {
          playAudio(join);
          navigate("/join-battle");
        }}
      >
        Or join already existing battles
      </p>
    </>
  );
};

export default pageHOC(
  CreateBattle,
  <>
    Create <br /> a new battle
  </>,
  <>Create your own battle and wait for other players to join you</>
);
