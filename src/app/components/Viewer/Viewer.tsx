import { Roboto_Mono } from "next/font/google";
import { useEffect, useState, useCallback } from "react";
import { loadFile, setRotation, OBJTopologyProjection } from "./converter";

const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
});

interface ViewerProps {
  dimensions: number;
  rotation: number;
  filePath: string;
}

export default function Viewer({
  dimensions,
  rotation,
  filePath,
}: ViewerProps) {
  const [obj, setObj] = useState<OBJTopologyProjection | null>(null);
  const [projection, setProjection] = useState<number[][]>([]);
  const [display, setDisplay] = useState<string[][]>([]);
  const densityString =
    " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";

  const valueToDensity = useCallback(
    (value: number) => {
      return densityString[Math.floor((value / 70) * densityString.length - 1)];
    },
    [densityString]
  );

  const updateDisplay = useCallback(
    (rotation: number) => {
      if (obj) {
        setRotation(rotation, obj);
        const newProjection = obj.getProjectionMatrix(dimensions);
        setProjection(newProjection);
        const newDisplay = newProjection.map((row) =>
          row.map((value) => valueToDensity(value))
        );
        setDisplay(newDisplay);
      }
    },
    [obj, dimensions, valueToDensity]
  );

  useEffect(() => {
    async function fetchData() {
      if (filePath) {
        console.log("Loading file from path:", filePath);
        const obj = await loadFile(filePath);
        if (obj) {
          console.log("File loaded successfully:", obj);
          setObj(obj);
          const newProjection = obj.getProjectionMatrix(dimensions);
          setProjection(newProjection);
          const newDisplay = newProjection.map((row) =>
            row.map((value) => valueToDensity(value))
          );
          setDisplay(newDisplay);
          console.log("Model loaded");
        } else {
          console.log("Failed to load file.");
        }
      }
    }
    fetchData();
  }, [filePath, dimensions, valueToDensity]);

  useEffect(() => {
    if (obj) {
      console.log("Updating display with rotation:", rotation);
      updateDisplay(rotation);
    }
  }, [obj, rotation, updateDisplay]);

  return (
    <div
      className={`${roboto.className} w-[${dimensions}rem] h-[${dimensions}rem] ring-2 rounded-md ring-green-500 text-white p-2 grid grid-cols-16 justify-center items-center leading-none`}
    >
      <div>
        {obj ? (
          <></>
        ) : (
          <div className="text-center text-lg">No Model Loaded</div>
        )}
        {display.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-center text-center text-[0.5rem]"
          >
            {row.map((col, j) => (
              <div
                key={j}
                className="w-[8px] h-[8px] flex justify-center items-center"
              >
                <div className="w-[1px] h-[1px]">{col}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
