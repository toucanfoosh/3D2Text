export function Navbar() {
  return (
    <div className="flex justify-between w-[100vw] h-[3rem] p-2">
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          const newWindow = window.open(
            "https://www.toucanfish.com/",
            "_blank"
          );
          if (newWindow) {
            newWindow.focus();
          }
        }}
      >
        Made by Daniel Wu
      </div>
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          const newWindow = window.open(
            "https://github.com/toucanfoosh/3D2Text",
            "_blank"
          );
          if (newWindow) {
            newWindow.focus();
          }
        }}
      >
        Open this in GitHub
      </div>
    </div>
  );
}
