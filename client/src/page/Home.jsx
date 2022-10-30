import { Contract } from "ethers";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { pageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, setShowAlert, showAlert } =
    useGlobalContext();
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");

  const handleClick = async () => {
    try {
      await contract.registerPlayer(playerName, playerName);
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, {
          gasLimit: 500000,
        });
        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being Summoned!`,
        });
      }
    } catch (error) {
      setShowAlert({
        status: true,
        type: "failure",
        message: "Something went Wrong!",
      });
    }
  };

  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);
      if (playerExists && playerTokenExists) {
        navigate("/create-battle");
      }
    };
    if (contract) checkForPlayerToken();
  }, [contract]);

  return (
    <div className="flex flex-col">
      <CustomInput
        Label="Name"
        placeholder="Enter your player name"
        value={playerName}
        handleValueChange={setPlayerName}
      ></CustomInput>
      <CustomButton
        title="register"
        handleClick={handleClick}
        restStyles="mt-6"
      ></CustomButton>
    </div>
  );
};

export default pageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a web3 NFT card Game
  </>,
  <>
    Connect your wallet to start playing <br />
    the ultimate web3 battle card game
  </>
);
