import React, { useEffect, useState } from "react";
import "./BuilderShips.scss";
import { ReactSVG } from "react-svg";

const BuilderShips = ({ ships, setShips, onDragEndHandler, selectedShip, onDragStartHandler }) => {

  const [convertedShips, setConvertedShips] = useState([]);

  // actions
  const rotateShip = (id) => {
    const rotatedShip = ships.map((el) =>
      el.id === id
        ? el.dir === "x"
          ? { ...el, dir: "y" }
          : { ...el, dir: "x" }
        : { ...el }
    );
    setShips(rotatedShip);
  };

  //effects
  useEffect(() => {
    if (ships) {
      const newConvertedShips = ships.reduce(
        (acc, cur) => {
          acc[cur.length - 1].push(cur);
          return acc;
        },
        [[], [], [], []]
      );
      setConvertedShips(newConvertedShips);
    }
  }, [ships]);

  return (
    <div className="builder-ships-container">
      <div className="ships">
        {convertedShips.length &&
          convertedShips.map((group, idx) => (
            <div key={idx} className="ships-row">
              {group.map((el) => (
                <div key={el.id} className='ship-container'>
                  <ReactSVG
                    className={`ship ship${el.shipName} ${selectedShip.id === el.id && "selected"} dir-${el.dir}`}
                    onClick={() => rotateShip(el.id)}
                    draggable={true}
                    onDragEnd={(e) => onDragEndHandler(e)}
                    onDragStart={(e) => onDragStartHandler(e, el)}
                    src={`./images/ships/ship-${el.shipName}-${el.dir}.svg`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default BuilderShips;
