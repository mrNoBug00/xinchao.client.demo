import React from "react";
import SignatureCanvas from "react-signature-canvas";

interface SignatureProps {
  signatureRef: React.RefObject<SignatureCanvas>;
  handleClearSignature: () => void;
  handleSignatureChange: () => void;
}

const Signature: React.FC<SignatureProps> = ({
  signatureRef,
  handleClearSignature,
  handleSignatureChange,
}) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center p-4 border border-gray-300 rounded-md">
      <h2 className="text-lg font-medium mb-4">Chữ ký</h2>
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{
          width: 500,
          height: 200,
          className: "border border-gray-300",
        }}
        onEnd={handleSignatureChange} // Gọi hàm mỗi khi hoàn tất việc ký
      />
      <button
        type="button"
        onClick={handleClearSignature}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md">
        Xóa chữ ký
      </button>
    </div>
  );
};

export default Signature;
