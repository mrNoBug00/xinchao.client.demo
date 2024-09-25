import { FC, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const ModalRefuseBooking: FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Refuse reason</h2>
        <textarea
          className="w-full border rounded p-2 mb-4"
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Nhập lý do từ chối"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors"
            onClick={onClose}>
            Close
          </button>
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
            onClick={() => onConfirm(reason)}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalRefuseBooking;
