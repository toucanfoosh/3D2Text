import { Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
});

export default function Viewer() {
  const test: String[][] = [];
  for (let i = 0; i < 16; i++) {
    test.push([]);
    for (let j = 0; j < 16; j++) {
      test[i].push("w");
    }
  }

  return (
    <div
      className={`${roboto.className} w-[18rem] h-[18rem] ring-2 rounded-md ring-green-500 text-white p-2 grid grid-cols-16 justify-center items-center leading-none`}
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
