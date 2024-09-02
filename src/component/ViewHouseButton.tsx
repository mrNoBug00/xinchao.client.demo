import React from "react";


interface ViewHouseButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}


const ViewHouseButton: React.FC<ViewHouseButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}>
      {children}
    </button>
  );
};

export default ViewHouseButton;
