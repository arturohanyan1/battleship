import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBot, getBotBoard, getBotShips, getLevel, getPlayer, getPlayerBoard, getPlayerShips, getSound } from "../../store/selectors";
import GameBoard from "../GameBoard/GameBoard";
import "./Game.scss";
import useSound from "use-sound";
import shotSound1 from "../../assets/sounds/game/shot1.mp3";
import boomSound1 from "../../assets/sounds/game/boom1.mp3";
import getShotCoords from "../../helpers/getShotCoords/gameShotCoords";
import { ALREADY_SHOTED_MESSAGE } from "../../constants/constants";
import setCrashedShipOnBoard from "../../helpers/setCrashedShipOnBoard";
import PlayerInfoPanel from "../PlayerInfoPanel/PlayerInfoPanel";
import { setPlayerlostCount, setPlayerWinCount } from "../../store/actionCreators/player";
import { setBotlostCount, setBotWinCount } from "../../store/actionCreators/bot";
import { openDialog } from "../../store/actionCreators/dialodManager";
import { useNavigate } from "react-router";

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [shot1] = useSound(shotSound1, { volume: 0.2 });
  const [boom1] = useSound(boomSound1, { volume: 0.2 });

  const reduxPlayerBoard = useSelector(getPlayerBoard);
  const reduxBotBoard = useSelector(getBotBoard);
  const reduxPlayerShips = useSelector(getPlayerShips);
  const reduxBotShips = useSelector(getBotShips);
  const sound = useSelector(getSound);
  const level = useSelector(getLevel);
  const player = useSelector(getPlayer);
  const bot = useSelector(getBot);

  const [playerBoard, setPlayerBoard] = useState([]);
  const [playerShips, setPlayerShips] = useState([]);
  const [botBoard, setBotBoard] = useState([]);
  const [botShips, setBotShips] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [botCrashedShips, setBotCrashedShips] = useState([]);
  const [playerCrashedShips, setPlayerCrashedShips] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [playerInjuredShipCoords, setPlayerInjuredShipCoords] = useState([]);

  // Actions
  const shotHandler = (x, y, isPlayerBoard, shipId) => {
    if (!isPlayerBoard && playerTurn && !gameOver) {
      const newBotBoard = JSON.parse(JSON.stringify(botBoard));
      if (newBotBoard[x][y].shoted)
        return messageApi.open(ALREADY_SHOTED_MESSAGE);
      if (sound) shot1();
      newBotBoard[x][y].shoted = true;
      if (!newBotBoard[x][y].hasShipPart) {
        setPlayerTurn(false);
      }
      if (Boolean(shipId)) {
        newBotBoard[x][y].shipStatus = "injured";
        const newBotShips = botShips.map((ship) => {
          if (shipId === ship.id) {
            ship.shotedCount++;
            if (ship.shotedCount === ship.length) {
              if (sound) boom1();
              ship.crashed = true;
              setCrashedShipOnBoard(ship, newBotBoard);
              setBotCrashedShips((prev) => [...prev, { ...ship }]);
            }
          }
          return ship;
        });
        setBotShips(JSON.parse(JSON.stringify(newBotShips)));
      }
      setBotBoard(JSON.parse(JSON.stringify(newBotBoard)));
    }
  };

  // Effects
  useEffect(() => {
    if (reduxPlayerBoard.length && reduxPlayerShips.length && reduxBotBoard.length && reduxBotShips.length) {
      setPlayerBoard(reduxPlayerBoard);
      setPlayerShips(reduxPlayerShips);
      setBotBoard(reduxBotBoard);
      setBotShips(reduxBotShips);
    } else {
      navigate('/')
    }
  }, [reduxPlayerBoard, reduxPlayerShips, reduxBotBoard, reduxBotShips]);

  useEffect(() => {
    if (playerCrashedShips.length === 10) {
      dispatch(setBotWinCount());
      dispatch(setPlayerlostCount());
      setGameOver(true);
      dispatch(openDialog('GameOverDialog', { winner: bot.username }))
    }
  }, [playerCrashedShips]);

  useEffect(() => {
    if (botCrashedShips.length === 10) {
      dispatch(setPlayerWinCount());
      dispatch(setBotlostCount());
      setGameOver(true);
      dispatch(openDialog('GameOverDialog', { winner: player.username }))
    }
  }, [botCrashedShips]);

  useEffect(() => {
    if (!playerTurn && playerBoard && !gameOver) {
      const shotCoords = getShotCoords(
        level,
        playerBoard,
        playerShips,
        playerInjuredShipCoords
      );
      if (!shotCoords) return console.log("gameover");
      if (Boolean(shotCoords)) {
        const { x, y } = shotCoords;
        if (!playerBoard[x][y].shoted) {
          setTimeout(() => {
            if (sound) shot1();
            const newPlayerBoard = JSON.parse(JSON.stringify(playerBoard));
            newPlayerBoard[x][y].shoted = true;
            if (!newPlayerBoard[x][y].hasShipPart) {
              setPlayerTurn(true);
            } else if (Boolean(newPlayerBoard[x][y].shipId)) {
              newPlayerBoard[x][y].shipStatus = "injured";
              setPlayerInjuredShipCoords((prev) => [...prev, { x, y }]);
              const newPlayerShips = playerShips.map((ship) => {
                if (newPlayerBoard[x][y].shipId === ship.id) {
                  ship.shotedCount++;
                  if (ship.shotedCount === ship.length) {
                    if (sound) boom1();
                    ship.crashed = true;
                    setPlayerInjuredShipCoords([]);
                    setCrashedShipOnBoard(ship, newPlayerBoard);
                    setPlayerCrashedShips((prev) => [...prev, { ...ship }]);
                  }
                }
                return ship;
              });
              setPlayerShips(JSON.parse(JSON.stringify(newPlayerShips)));
            }
            setPlayerBoard(JSON.parse(JSON.stringify(newPlayerBoard)));
          }, 1000);
        } else {
          alert("player turn");
          setPlayerTurn(true);
        }
      } else {
        alert("something went wrong");
      }
    }
  }, [playerTurn, playerBoard]);

  return (
    <div className="game_container">
      {contextHolder}
      <div className="game_container__game">
        <div className="game-section player-section">
          <div className="panel-section player-section-panel">
            <PlayerInfoPanel infoData={{ ...player, crashedShips: playerCrashedShips }} />
          </div>
          <GameBoard
            board={playerBoard}
            isPlayerBoard={true}
            onClick={shotHandler}
            playerTurn={playerTurn}
            gameOver={gameOver}
            extraSmall={true}
          />
        </div>
        <div className="game-section bot-section">
          <GameBoard
            board={botBoard}
            isPlayerBoard={false}
            onClick={shotHandler}
            playerTurn={playerTurn}
            gameOver={gameOver}
          />
          <div className="panel-section bot-section-panel">
            <PlayerInfoPanel infoData={{ ...bot, crashedShips: botCrashedShips }} reverse />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
