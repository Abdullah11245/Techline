import React from "react";
// import "./Loader.css";

const Loader = () => {
  return (
//     <div className="h-screen w-full flex justify-center items-center ">
// <div className="dot-spinner">
//     <div className="dot-spinner__dot"></div>
//     <div className="dot-spinner__dot"></div>
//     <div className="dot-spinner__dot"></div>
//     <div className="dot-spinner__dot"></div>
//     <div className="dot-spinner__dot"></div>
//     <div className="dot-spinner__dot"></div>
//     <div className="dot-spinner__dot"></div>
//     <div className="dot-spinner__dot"></div>
// </div>

//     </div>
<div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin">
      <div className="h-12 w-12 border-4 border-primary-500 border-t-accent-500 rounded-full" />
    </div>
  </div>
  );
};

export default Loader;