import { IBM_Plex_Sans_Condensed } from "next/font/google";

const ibm = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: "700",
});

export default function Logo() {
  return (
    <div className={`${ibm.className} tracking-tight`}>
      <text className="">3D</text>
      <text className="text-green-500">2Text</text>
    </div>
  );
}
