import React from "react";

const NAV = () => {
  return (
    <div className="bg-linear-to-br from-orange-900/70 to-black/70 shadow-[0_0_20px_1px_rgba(100,50,0,1)] backdrop-blur-lg w-[100%] p-2 flex justify-between items-center px-[10%]">
      <div className="flex items-center gap-3 cursor-pointer">
        <img src="/logo.svg" width={50} className="shadow-white rounded-full"/>
        <span className="text-white font-bold text-xl ">Pass <span className="text-orange-200/60">Souls III </span>(local)</span >
      </div>
    </div>
  );
};

export default NAV;
