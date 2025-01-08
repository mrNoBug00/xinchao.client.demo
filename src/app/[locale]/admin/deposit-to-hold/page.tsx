"use client";

import React, { useEffect, useState } from "react";
import "../../../../styles/globals.css";
import ContractList from "@/component/admin/ContractList";
import { useTranslations } from "next-intl";
import NotScheduled from "../../../../component/table/NotScheduled";
import { fetchData } from "@/service/api";
import Scheduled from "@/component/table/Scheduled";
import DownloadImageCard from "@/component/DownloadImageCard";
import CloseButton from "@/component/CloseButton";
import { depositApiPath } from "@/utils/apiPath";

interface Deposit {
  id: string;
  name: string;
  phone: string;
  product: {
    name: string;
    price: number;
  };
  createAt: string;
  contactImage: Array<{ imageUrl: string }>;
  receiptImage: Array<{ imageUrl: string }>;
  isViewed: boolean;
}

const DepositToHoldPage: React.FC = () => {
  const t = useTranslations("DepositToHold");

  const [activeTab, setActiveTab] = useState<string>("scheduled");

  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [notScheduledDeposits, setNotScheduledDeposits] = useState<Deposit[]>(
    []
  );
  const [scheduledDeposits, setScheduledDeposits] = useState<Deposit[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchDeposits = async () => {
      const data = await fetchData(depositApiPath.getDeposit);
      setDeposits(data);
    };

    fetchDeposits();
  }, []);

  useEffect(() => {
    const notScheduled = deposits.filter((deposit) => !deposit.isViewed);
    const scheduled = deposits.filter((deposit) => deposit.isViewed);

    setNotScheduledDeposits(notScheduled);
    setScheduledDeposits(scheduled);
  }, [deposits]); // This effect will run whenever deposits are updated



  return (
    <div className="max-w-7xl mx-auto p-4 h-screen w-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => handleTabChange("scheduled")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "scheduled"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            {t("scheduled")}
          </button>
          <button
            onClick={() => handleTabChange("notScheduled")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "notScheduled"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            {t("not scheduled")}
          </button>
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === "scheduled" && (
          <div>
            <Scheduled deposits={scheduledDeposits} />
          </div>
        )}
        {activeTab === "notScheduled" && (
          <div>
            <NotScheduled
              deposits={notScheduledDeposits}
            />
            
          </div>
        )}
      </div>
    </div>
  );
};

export default DepositToHoldPage;
