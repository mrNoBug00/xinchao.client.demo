import React from 'react';

const Skeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-sm animate-pulse m-4">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
      
      {/* Title placeholder */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      
      {/* Address placeholder */}
      <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
      
      {/* Price placeholder */}
      <div className="h-5 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
};

export default Skeleton;