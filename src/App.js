import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./data";
import DrumPad from "./DrumPad";
function App() {
  const [padBank, setPadBank] = useState({
    currentBank: data[0],
    power: true,
    volume: 0.3,
    display: "",
  });

  useEffect(() => {
    if (padBank.display !== "") {
      setTimeout(() => {
        setPadBank((prev) => {
          return { ...prev, display: "" };
        });
      }, 1000);
    }
  }, [padBank]);

  function keyPlayed(key) {
    setPadBank((prev) => {
      return { ...prev, display: key };
    });
  }

  return (
    <React.Fragment>
      <div className="app">
          <h1>Drum Machine</h1>
        <div id="drum-machine">
          <div className="drum-panel">
            {padBank.currentBank.keys.map((key) => (
              <DrumPad
                drumKey={key}
                key={key.id}
                volume={padBank.volume}
                power={padBank.power}
                onKeyPlayed={keyPlayed}
              />
            ))}
          </div>
          <div className="switch-panel">
            <div id="power">
              <button
                className={padBank.power ? "on" : ""}
                onClick={() => {
                  setPadBank((prev) => {
                    return { ...padBank, power: !prev.power };
                  });
                }}
              >
                {padBank.power ? "ON" : "OFF"}
              </button>
            </div>
            <div id="display">{padBank.display}</div>
            <div id="volume">
              <input
                type="range"
                value={padBank.volume}
                max="1"
                min="0"
                step="0.01"
                onChange={(e) => {
                  setPadBank((prev) => {
                    return {
                      ...prev,
                      volume: e.target.value,
                      display: `Volume: ${Math.round(e.target.value * 100)}%`,
                    };
                  });
                }}
              />
            </div>
            <div id="bank">
              <select
                onChange={(e) => {
                  setPadBank((prev) => {
                    return {
                      ...prev,
                      currentBank: data[e.target.value],
                      display: `${data[e.target.value].label}`,
                    };
                  });
                }}
              >
                {data.map((ele, index) => (
                  <option key={index} value={index}>
                    {ele.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
