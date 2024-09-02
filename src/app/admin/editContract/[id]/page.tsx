'use client'


import React, { useEffect, useState } from "react";
import "../../../../styles/contract.css";
import "../../../../styles/globals.css";
import { fetchData, IMG_URL } from "../../../../service/api";
import { contractApiPath } from "../../../../utils/admin/apiPath";
import Image from "next/image";
import { EditContractProps } from "../../../../service/interfaces/Product"
import { ContractData } from "../../../../service/interfaces/Contract";


const EditContract: React.FC<EditContractProps> = ({ params }) => {
  const [contractData, setContractData] = useState<ContractData | undefined>();
  const { id } = params;

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const data = await fetchData(
          `${contractApiPath.getContractById}/${id}`
        );

        setContractData(data);
      } catch (error) {
        console.error("Failed to fetch contract data:", error);
      }
    };

    fetchContractData();
  }, [id]);

  if (!contractData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="info-container">
        <a className="title">HỢP ĐỒNG THUÊ NHÀ</a>
      </div>

      <div className="info-container">
        <a>
          Hôm nay, ngày {contractData.createTime[2]} tháng{" "}
          {contractData.createTime[1]} năm {contractData.createTime[0]}, các Bên
          gồm:
        </a>
      </div>

      <div className="info-container">
        <a className="section-heading">BÊN CHO THUÊ (Bên A):</a>
        <a>Ông: 立慶資產管理顧問股份有限公司</a>
        <a>MST số: 91048432</a>
        <a>Nơi ĐKTT: 台中市潭子區中山路二段198號2F</a>
        <a>Line ID: @416ztseb</a>
      </div>
      <div className="info-container">
        <a className="section-heading">BÊN THUÊ (Bên B) :</a>
        <a>Ông(bà): {contractData.renter}</a>
        <a>CMND số: {contractData.identificationId}</a>
        <a>Cơ quan cấp: </a>
        <a>Nơi ĐKTT: </a>
        <a>Line ID: </a>
        <a>Zalo: </a>
        <a>Phone: {contractData.phone}</a>
      </div>
      <div className="info-container">
        <a className="section-heading">Người bảo lãnh: </a>
        <a>Ông(bà): </a>
        <a>CMND số: </a>
        <a>Cơ quan cấp: </a>
        <a>Nơi ĐKTT: </a>
        <a>Line ID: </a>
        <a>Zalo: </a>
        <a>Phone: </a>
      </div>
      <div className="info-container">
        <a className="section-heading">I. Đối tượng thuê: </a>
        <a>Địa chỉ nhà thuê: {contractData.product.address}</a>
        <a>1. Bộ phận cho thuê: {contractData.product.name}</a>
        <a>2. Thời gian sử dụng phòng: toàn thời gian</a>
        <a>
          3. Đồ dùng bên cho thuê cấp:{" "}
          {contractData.equipmentProvidedByTheLessor}
        </a>
      </div>
      <div className="info-container">
        <a className="section-heading">II. Thời gian thuê: </a>
        <a>
          1. Thời gian hợp đồng kể từ năm {contractData.rentTimeFrom[0]} tháng{" "}
          {contractData.rentTimeFrom[1]} ngày {contractData.rentTimeFrom[2]} đến
          năm {contractData.rentTimeTo[0]} tháng {contractData.rentTimeTo[1]}{" "}
          ngày {contractData.rentTimeTo[2]}
        </a>
        <a>2. Số lượng khách thuê: {contractData.numberOfRenter}</a>
      </div>
      <div className="info-container">
        <a className="section-heading">III. Hợp đồng thuê và thanh toán: </a>
        <a>1. Tiền thuê phòng hàng tháng: {contractData.rentFee} NTD</a>
        <a>
          2. Mỗi tháng đóng tiền phòng 1 lần vào ngày{" "}
          {contractData.dayOfPayRentFee} hàng tháng
        </a>
        <a>
          3. Thanh toán chậm thời gian hợp đồng. Bên B phải đóng thêm 300
          NTD/ngày
        </a>
        <a>4. Trách nhiệm bên B</a>
        <a>4.1. tiền điện: {contractData.electricityFee}</a>
        <a>Có sử dụng tủ lạnh một tháng phải nộp 200/chiếc</a>
        <a>Có sử dụng Quạt tản nhiệt nước phí hàng tháng 200/chiếc</a>
        <a>Có sử dụng xe đạp điện là 150/ chiếc</a>
        <a>4.2. hóa đơn tiền nước: {contractData.waterFee} /tháng</a>
        <a>4.3. hóa đơn khí đốt tự nhiên: </a>
        <a>4.4. đồ dùng hằng ngày trong nhà bị hư hỏng: </a>
        <a>
          Xin lưu ý rằng thiết bị do bên A cung cấp đều ở trong tình trạng sử
          dụng tốt.
        </a>
        <a>
          Khi bên B nhận và sử dụng thiết bị, nếu trong quá trình sử dụng xảy ra
          hư hỏng, hao mòn thì bên B phải tự mua thiết bị thay thế, sửa chữa và
          bên A sẽ không chịu bất kỳ trách nhiệm nào
        </a>
      </div>
      <div className="info-container">
        <a className="section-heading">IV. Thỏa thuận đặt cọc và hoàn trả: </a>
        <a>
          Theo thỏa thuận hai bên, phí đặt cọc tương đương 2 tháng tiền nhà.
        </a>
        <a>Tiền cọc NT {contractData.tenancyDeposit}</a>
        <a>
          Nộp tiền đặt cọc lúc hai bên ký kết hợp đồng, tiền đặt cọc không được
          chuyển đổi thành tiền thuê phòng
        </a>
      </div>
      <div className="info-container">
        <a className="section-heading">
          V. Điều kiện trả lại tiền thuê vi phạm hợp đồng:
        </a>
        <a>
          Hợp đồng chưa hết hạn và hai bên không được phép chấm dứt hợp đồng khi
          chưa được chấp thuận của đối phương.
        </a>
        <a>
          Nếu vi phạm một trong chín điều sau đây bên A sẽ không đồng ý cho Bên
          B ở tiếp và lập tức yêu cầu bên B rời đi và sẽ không hoàn lại tiền cọc
        </a>
        <a>
          1. Trong thời gian hợp đồng thuê, bên thuê không được phép vi phạm
          pháp luật, không được tụ tập đánh bạc dưới mọi hình thức hay lập sòng
          bạc, không được hành nghề mại dâm.
        </a>
        <a>
          2. Giữ vệ sinh chung, Không được ồn ào to tiếng làm ảnh hưởng hàng xóm
        </a>
        <a>3. Số lượng người ở không đúng với số người đã đăng ký </a>
        <a>4. Nếu thêm người phải báo với cty </a>
        <a>
          5. Vào và ra khỏi nhà và phòng phải tắt công tắc đèn hoặc đóng cửa
        </a>
        <a>6. Cty gửi line bắt buộc phải xem và trả lời cty </a>
        <a>
          7. Cty cho bạn thuê bạn không được tự tiện cho người khác thuê nếu bạn
          cho người khác thuê bạn phải báo với cty
        </a>
        <a>
          8. Nếu bạn chậm quá 15 ngày cty sẽ kết thúc hợp đồng và không cho bạn
          thuê nữa
        </a>
        <a>
          9. Trong nhà không được hút thuốc dễ sảy ra cháy nếu bạn muốn hút thì
          ra ngoài hút
        </a>
      </div>
      <div className="info-container">
        <a>Nội dung hợp đồng đã được đọc kỹ và ký tên: </a>
        <Image
          src={`${IMG_URL}/${contractData.signature.imageUrl}`}
          alt={contractData.signature.imageUrl}
          width={100}
          height={100}
        />

        <a>
          Chúng tôi không đến tận nơi để thu phí tiền phòng của mọi người, xin
          vui lòng chuyển khoản cho chúng tôi, nếu bạn không biết chuyển khoản
          như thế nào thì hỏi bạn bè hoặc nhờ người chuyển khoản giúp, vui lòng
          chuyển phí tiền nhà ở vào tài khoản dưới đây cho chúng tôi và chụp lại
          biên lai gửi tiền. Liên quan tới tự đi chuyển khoản hoặc nhờ người
          giúp chuyển khoản, xin vui lòng xác nhận với chủ nhà trước khi đi
          chuyển tiền, rồi sau đó hãy chuyển tiền
        </a>
      </div>
      <div className="info-container">
        <a>Tài khoản ngân hàng tại Việt Nam:</a>
        <a>Tên ngân hàng: Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)</a>
        <a>Số tài khoản: 8099889889</a>
      </div>
      <div className="info-container">
        <a>Tài khoản ngân hàng tại Đài Loan:</a>
        <a>Tên ngân hàng: 合作金庫銀行</a>
        <a>Số tài khoản: 3616717011556</a>
        <a>Mã chi nhánh: 006</a>
      </div>
      <div className="identification-image">
        <Image src="/bank.png" alt="Bank Image" width={500} height={300} />
      </div>
      <div className="info-container">
        <a>Identification Card:</a>
        <div className="identification-card-container">
          {contractData.identificationCard.map((card) => (
            <Image
              key={card.id}
              src={`${IMG_URL}/${card.imageUrl}`}
              alt={card.imageUrl}
              className="identification-image"
              width={500}
              height={300}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditContract;
