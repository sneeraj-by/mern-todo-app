import React from "react";

const Loader = ({ count }) => {
  return (
    <div className="animate-pulse p-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      ))}
    </div>
    // <div className="flex justify-center items-center h-screen">
    //   <ClipLoader loading={loading} size={50} color="#4A90E2" />
    // </div>
    // <div className="animate-pulse">
    //   <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
    //   <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    //   <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
    //   <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
    // </div>
    // spinner code
    // <div className="flex items-center justify-center min-h-screen">
    //   <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
    // </div>
  );
};

export default Loader;
