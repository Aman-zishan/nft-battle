import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createBattle from "./createBattle";
import { useGlobalContext } from "../context";
import { CustomButton, pageHOC } from "../components";
import styles from "../styles";
import { joinPaths } from "@remix-run/router";

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
    } catch (error) {
      console.log(error);
    }
  };

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
