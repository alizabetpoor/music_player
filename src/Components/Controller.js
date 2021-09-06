import { useEffect, useRef, useState } from "react";
import "./Controller.css";
const Controller = ({ audioplayer, currentTime, duration }) => {
  const controllerHandler = (e) => {
    audioplayer.current.currentTime = (e.target.value * duration) / 100;
  };

  const showTime = (time) => {
    if (time / 60 > 1) {
      let min = parseInt(time / 60, 10);
      let second = parseInt(time % 60);

      if (min < 10) {
        min = `0${min}`;
      }
      if (second < 10) {
        second = `0${second}`;
      }
      return `${min}:${second}`;
    } else {
      time = parseInt(time, 10);
      if (time < 10) {
        time = `0${time}`;
      }
      return `0:${time}`;
    }
  };
  const setValueProgress = () => {
    return String((currentTime * 100) / duration);
  };
  return (
    <div className="controller h-14 flex flex-col items-center justify-center">
      <div className="flex justify-between w-5/6">
        <p>{showTime(currentTime)}</p>
        <p>{showTime(duration)}</p>
      </div>
      <div className="w-5/6 h-4 progressbar">
        <input
          onChange={controllerHandler}
          type="range"
          value={setValueProgress()}
          min="0"
          max="100"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Controller;
