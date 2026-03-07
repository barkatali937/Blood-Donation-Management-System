import React from "react";

const DonorNotFound = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[60vh]">
      <div className="card bg-base-100 shadow-xl border border-base-300 w-full max-w-md">
        <div className="card-body text-center">
          <h2 className="card-title text-red-400 justify-center text-2xl">
            Donors Not Found
          </h2>
          <p className="opacity-70">
            Please try a different search or filter.
          </p>
        </div>
      </div>
    </div>
 );
};

export default DonorNotFound;