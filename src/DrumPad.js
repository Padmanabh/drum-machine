import React, { useState, useEffect } from "react";

const DrumPad = (props) => {
  const styles = {
    activeStyle: {
      backgroundColor: "aqua",
      fontSize: "x-large",
    },
    defaultStyle: {
      fontSize: "xx-large",
    },
  };
  const [padStyle, setPadStyle] = useState(styles.defaultStyle);
  function drumKeyPressed() {
    if (power) {
      const sound = document.getElementById(keyTrigger);
      sound.currentTime = 0;
      sound.volume = volume;
      sound.play();
      onKeyPlayed(id);
      setPadStyle(styles.activeStyle);
      setTimeout(() => {
        setPadStyle(styles.defaultStyle);
      }, 500);
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }); // Empty array ensures that effect is only run on mount and unmount

  function downHandler({ key }) {
    if (key.toLowerCase() === keyTrigger.toLowerCase()) {
      drumKeyPressed(keyTrigger);
    }
  }

  const { keyTrigger, id, url, keyCode } = props.drumKey;
  const volume = props.volume;
  const power = props.power;
  const onKeyPlayed = props.onKeyPlayed;
  return (
    <button
      className="drum-pad"
      id={id}
      keycode={keyCode}
      onClick={drumKeyPressed}
      style={padStyle}
    >
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={url} volume={volume} />
    </button>
  );
};

export default DrumPad;
