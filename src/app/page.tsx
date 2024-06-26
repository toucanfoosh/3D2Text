import Logo from "./components/Logo/Logo";
import Description from "./components/Description/Description";
import Button from "./components/Button/Button";
import Viewer from "./components/Viewer/Viewer";
import Slider from "./components/Slider/Slider";
import { Jost } from "next/font/google";
import { ChangeEvent, useState } from "react";

const jost = Jost({
  subsets: ["latin"],
  weight: "300",
});

export default function Home() {
  return (
    <div
      className={`${jost.className} flex flex-col justify-center items-center m-4`}
    >
      <div className="p-8 pb-0 text-5xl">
        <Logo />
      </div>
      <Description />
      <div className="p-4" />
      <Button />
      <div className="p-4" />
      <Viewer />
      <div className="p-4" />
      <Slider />
    </div>
  );
}
