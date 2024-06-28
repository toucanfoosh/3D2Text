import { ChangeEvent } from "react";

interface ButtonProps {
  setFilePath: (filePath: string) => void;
}

export default function Button({ setFilePath }: ButtonProps) {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const filePath = URL.createObjectURL(file);
      setFilePath(filePath);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center w-[16rem]">
        <label className="text-center ring-2 ring-green-500 rounded-md p-4 select-none hover:cursor-pointer hover:text-green-500 transition-colors hover:ease-in-out">
          Upload Model File Here
          <input
            type="file"
            accept=".obj"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
      <div className="pt-4 text-gray-500 text-center">
        Compatible with .obj files
      </div>
      <div className="text-red-700 text-center">
        WILL lag with larger file sizes/higher dimension renders
      </div>
    </div>
  );
}
