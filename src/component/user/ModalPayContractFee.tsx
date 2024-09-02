import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface ProductData {
  price?: number;
}

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleConfirm: () => void;
  productData: ProductData;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  handleConfirm,
  productData,
}) => {
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [deposit, setDeposit] = useState<number | undefined>(undefined);
  const [brokerFee, setBrokerFee] = useState<number | undefined>(undefined);
  const [total, setTotal] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (productData?.price) {
      const newPrice = productData.price;
      const totalFee = productData.price * 3.5;
      setPrice(newPrice);
      setDeposit(newPrice * 2);
      setBrokerFee(newPrice / 2);
      setTotal(totalFee);
    }
  }, [productData?.price]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900">
                  Please kindly pay the following fees:
                </Dialog.Title>
                <div className="mt-2">
                  <div className="border border-gray-300 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mt-2">
                      1. Two months of rent as a deposit: {deposit} NTD
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      2. The first month of rent: {price} NTD
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      3. Brokerage fee (pay only one time): {brokerFee} NTD
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Total: {total} NTD
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    The contract will only be effective after all these fees are
                    paid in full. Thank you.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                    onClick={handleConfirm}>
                    OK
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center ml-4 rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                    onClick={closeModal}>
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
