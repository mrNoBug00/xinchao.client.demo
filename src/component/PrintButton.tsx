import React from "react";
import { Button } from "@headlessui/react";
import PrintableTemplate from "./PrintableTemplate";
import { useReactToPrint } from "react-to-print";
import { PrintButtonProps } from "../service/interfaces/Print";


const PrintButton: React.FC<PrintButtonProps> = ({ formData }) => {
  const printableRef = React.useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
  });

  return (
    <div>
      <Button
        onClick={handlePrint}
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
        Print
      </Button>
      <div style={{ display: "none" }}>
        <PrintableTemplate ref={printableRef} formData={formData} />
      </div>
    </div>
  );
};

export default PrintButton;
