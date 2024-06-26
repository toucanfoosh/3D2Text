import { ChangeEvent } from "react";

export default function Button() {
  return (
    <div className="flex flex-col justify-center">
      <div className="w-[12rem] text-center ring-2 ring-green-500 rounded-md p-4 select-none hover:cursor-pointer hover:text-green-500 transition-colors hover:ease-in-out">
        Upload Model File Here
      </div>
      <div className="pt-2 text-gray-500 text-center">
        {" "}
        Compatible with .??? files{" "}
      </div>
    </div>
  );
}
