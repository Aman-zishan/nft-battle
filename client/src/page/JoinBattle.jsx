import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createBattle from "./createBattle";
import { useGlobalContext } from "../context";
import { CustomButton, pageHOC } from "../components";
import styles from "../styles";
import { playAudio } from "../utils/animation";
import { join, bg } from "../assets";

const JoinBattle = () => {
  const navigate = useNavigate();
  const { contract, gameData, setShowAlert, setBattleName, walletAddress } =
    useGlobalContext();

  const handleClick = async (battleName) => {
    setBattleName(battleName);

    try {
      await contract.joinBattle(battleName);
      setShowAlert({
        status: true,
        type: "success",
        message: `Joining ${battleName}`,
      });
      playAudio(bg);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
  }, [gameData]);
  return (
    <>
      <h2 className={styles.joinHeadText}>Available battles:</h2>
      <div className={styles.joinContainer}>
        {gameData?.pendingBattles.length ? (
          gameData.pendingBattles
            .filter((battle) => !battle.players.includes(walletAddress))
            .map((battle, index) => (
              <div key={battle.name + index} className={styles.flexBetween}>
                <p className={styles.joinBattleTitle}>
                  {index + 1}. {battle.name}
                </p>
                <CustomButton
                  title="Join"
                  handleClick={() => handleClick(battle.name)}
                ></CustomButton>
              </div>
            ))
        ) : (
          <p className={styles.joinLoading}>
            Reload the page to see new battles
          </p>
        )}
      </div>
      <p
        className={styles.infoText}
        onClick={() => {
          playAudio(join);
          navigate("/create-battle");
        }}
      >
        Or create a new Battle
      </p>
    </>
  );
};

export default pageHOC(
  JoinBattle,
  <>
    Join <br />a Battle
  </>,
  <>Join already existing battles</>
);
