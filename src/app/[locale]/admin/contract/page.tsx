"use client";

import { useState } from "react";
import '../../../../styles/globals.css'
import ContractList from "@/component/admin/ContractList";
const ContractPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("signed");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 h-screen w-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Contract</h1>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => handleTabChange("signed")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "signed"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            Signed Contract
          </button>
          <button
            onClick={() => handleTabChange("request")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "request"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            Request Contract
          </button>
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === "signed" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Signed Contracts</h2>
            <p>This section displays all signed contracts.</p>
          </div>
        )}
        {activeTab === "request" && (
          <div>
            <ContractList />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractPage;
