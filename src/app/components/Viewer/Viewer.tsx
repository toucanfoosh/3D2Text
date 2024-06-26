import { Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
});

export default function Viewer() {
  const dimensions = 32;
  const test: String[][] = [];
  for (let i = 0; i < dimensions; i++) {
    test.push([]);
    for (let j = 0; j < dimensions; j++) {
      test[i].push("w");
    }
  }

  return (
    <div
      className={`${roboto.className} w-[${dimensions}rem] h-[${dimensions}rem] ring-2 rounded-md ring-green-500 text-white p-2 grid grid-cols-16 justify-center items-center leading-none`}
    >
      <div>
        {test.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-center text-center "
          >
            {row.map((col, j) => (
              <div key={j} className="w-[15px] h-[15px]">
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
