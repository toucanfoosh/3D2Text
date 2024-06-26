"use client";

import "./index.css";
import { ChangeEvent, useState, useEffect } from "react";

const Slider: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    setInputValue(newValue.toString());
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = () => {
    let newValue = parseInt(inputValue, 10);
    if (isNaN(newValue)) {
      newValue = value;
    } else {
      if (newValue > 360) {
        newValue = newValue % 360;
      } else if (newValue < -360) {
        newValue = newValue % 360;
      }
    }
    setValue(newValue);
    setInputValue(newValue.toString());
    setIsEditing(false);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleInputBlur();
    }
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setValue((prevValue) => {
          const newValue = prevValue + 1;
          const loopedValue = newValue > 360 ? -360 : newValue;
          setInputValue(loopedValue.toString());
          return loopedValue;
        });
      }, 10); // Adds 1 to the value every 50ms

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center space-y-4 w-[16rem]">
      <input
        type="range"
        min="-360"
        max="360"
        value={value}
        onChange={handleChange}
        className="range w-full max-w-lg"
      />
      <div className="flex text-lg font-semibold w-[100%] ps-16">
        <div className="w-[50%] text-end">Degrees: </div>
        <div className="w-[50%] text-start overflow-visible">
          {isEditing ? (
            <div
              className="text-lg font-semibold cursor-pointer flex"
              onClick={() => setIsEditing(true)}
            >
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyPress={handleInputKeyPress}
                className="ps-1 bg-black outline-none text-start w-auto"
                autoFocus
              />
            </div>
          ) : (
            <div
              className="ps-1 cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              {value}
            </div>
          )}
        </div>
      </div>
      <div className="flex w-[16rem] justify-between">
        <button
          className={`ring-2 w-14 h-14 rounded-md flex justify-center items-center ${
            isPlaying
              ? "bg-red-500 ring-red-500 "
              : "bg-green-500 ring-green-500 "
          }`}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? "Stop" : "Spin"}
        </button>
        <button
          className={`ring-2 ring-green-500 w-14 h-14 rounded-md flex justify-center items-center hover:bg-green-500`}
          onClick={() => {
            setValue(() => {
              setInputValue("0");
              return 0;
            });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Slider;
