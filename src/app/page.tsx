"use client";

import Logo from "./components/Logo/Logo";
import Description from "./components/Description/Description";
import Button from "./components/Button/Button";
import Viewer from "./components/Viewer/Viewer";
import Slider from "./components/Slider/Slider";
import { Courier_Prime } from "next/font/google";
import { useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";

import "./globals.css";

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: "400",
});

export default function Home() {
  const [dimensions, setDimensions] = useState(32);
  const [filePath, setFilePath] = useState<string>("");
  const [rotation, setRotation] = useState<number>(0);

  return (
    <div>
      {/* Main Body */}
      <div className={`${courier.className} flex flex-col items-center mt-4`}>
        <div className="p-[30rem] text-5xl">
          <Logo />
        </div>
        <Description />
        <div className="p-4" />
        <Button setFilePath={setFilePath} />
        <div className="p-4" />
        <Viewer
          dimensions={dimensions}
          rotation={rotation}
          filePath={filePath}
        />
        <div className="p-4" />
        <Slider
          value={rotation}
          setValue={setRotation}
          dimensions={dimensions}
          setDimensions={setDimensions}
        />
        <div className="pt-8" />
        <div className="footer" />
        {/* Footer */}
        <div className="fixed bottom-0 backdrop-blur-sm bg-gray-900/25">
          <div className="h-[2px] w-[100vw] bg-green-500" />
          <Navbar />
        </div>
      </div>
    </div>
  );
}
