import React, { useState, useEffect } from "react";
import "./styles.css"; // Import file CSS
import { fetchData } from "../../../../service/api"; // Thay đổi đường dẫn cho đúng với vị trí của file chứa fetchData
import { companyInfo } from "@/utils/apiPath";

// Định nghĩa kiểu dữ liệu cho phản hồi từ API
interface Company {
  id: string;
  name: string;
  taxNumber: string;
  address: string;
  line: string;
}

const CompanyInfo = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const data: Company[] = await fetchData(companyInfo.getCompanyInfo);
        if (data && data.length > 0) {
          setCompany(data[0]); 
        }
      } catch (error) {
        console.error("Error fetching company info:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCompanyInfo();
  }, []); 

  if (loading) {
    return <p>Loading company information...</p>;
  }

  if (!company) {
    return <p>No company information available.</p>;
  }

  return (
    <div className="h-screen info-container">
      <div className="info-box">
        <p className="section-heading">Company:</p>
        <p>Name: {company.name}</p>
        <p>Tax number: {company.taxNumber}</p>
        <p>Address: {company.address}</p>
        <p>Line ID: {company.line}</p>
      </div>
    </div>
  );
};

export default CompanyInfo;
