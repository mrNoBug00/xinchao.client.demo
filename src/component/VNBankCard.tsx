import React from "react";
import styled from "styled-components";

const VNBankCard = () => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="foreground">
          <div className="credit-card-header">
            <div className="bank">
              {" "}
              Ngân hàng TMCP Kỹ thương Việt Nam (Techcombank)
            </div>
          </div>
          <div className="credit-card-chip-container">
            <svg
              xmlSpace="preserve"
              viewBox="0 0 511 511"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
              id="Capa_1"
              version="1.1"
              width="800px"
              height="800px"
              fill="#d4af37"
              className="chip">
              <path
                d="M455.5,56h-400C24.897,56,0,80.897,0,111.5v288C0,430.103,24.897,455,55.5,455h400c30.603,0,55.5-24.897,55.5-55.5v-288
      	C511,80.897,486.103,56,455.5,56z M464,248H343v-56.5c0-4.687,3.813-8.5,8.5-8.5H464V248z M343,263h121v65H343V263z M479,223h17v65
      	h-17V223z M479,208v-65h17v65H479z M464,168H351.5c-12.958,0-23.5,10.542-23.5,23.5V408H183V103h272.5c4.687,0,8.5,3.813,8.5,8.5
      	V168z M168,248H47v-65h121V248z M32,288H15v-65h17V288z M47,263h121v65H47V263z M263,88V71h137v17H263z M248,88H111V71h137V88z
      	 M168,103v65H47v-56.5c0-4.687,3.813-8.5,8.5-8.5H168z M32,208H15v-65h17V208z M15,303h17v65H15V303z M47,343h121v65H55.5
      	c-4.687,0-8.5-3.813-8.5-8.5V343z M248,423v17H111v-17H248z M263,423h137v17H263V423z M343,408v-65h121v56.5
      	c0,4.687-3.813,8.5-8.5,8.5H343z M479,303h17v65h-17V303z M496,111.5V128h-17v-16.5c0-12.958-10.542-23.5-23.5-23.5H415V71h40.5
      	C477.832,71,496,89.168,496,111.5z M55.5,71H96v17H55.5C42.542,88,32,98.542,32,111.5V128H15v-16.5C15,89.168,33.168,71,55.5,71z
      	 M15,399.5V383h17v16.5c0,12.958,10.542,23.5,23.5,23.5H96v17H55.5C33.168,440,15,421.832,15,399.5z M455.5,440H415v-17h40.5
      	c12.958,0,23.5-10.542,23.5-23.5V383h17v16.5C496,421.832,477.832,440,455.5,440z"
              />
            </svg>
          </div>
          <div className="info-container">
            <p className="names">
              CÔNG TY TNHH KINH DOANH VÀ SẢN XUẤT HOÀNG LÂM
            </p>
            <p className="serial">8099 8898 89</p>
          </div>
        </div>
        <svg
          viewBox="0 0 1600 800"
          height="100%"
          width="100%"
          className="background">
          <rect height={800} width={1600} fill="#ff9d00" />
          <g
            transform="rotate(-30 500 100)"
            strokeOpacity="0.05"
            strokeWidth="66.7"
            stroke="#000">
            <circle r={2100} cy={0} cx={0} fill="#ff9d00" />
            <circle r={2000} cy={0} cx={0} fill="#ff9d00" />
            <circle r={1900} cy={0} cx={0} fill="#ff9d00" />
            <circle r={1800} cy={0} cx={0} fill="#ff9d00" />
            <circle r={1700} cy={0} cx={0} fill="#fb8d17" />
            <circle r={1600} cy={0} cx={0} fill="#f47d24" />
            <circle r={1500} cy={0} cx={0} fill="#ed6e2d" />
            <circle r={1400} cy={0} cx={0} fill="#e35f34" />
            <circle r={1300} cy={0} cx={0} fill="#d85239" />
            <circle r={1200} cy={0} cx={0} fill="#cc453e" />
            <circle r={1100} cy={0} cx={0} fill="#be3941" />
            <circle r={1000} cy={0} cx={0} fill="#b02f43" />
            <circle r={900} cy={0} cx={0} fill="#a02644" />
            <circle r={800} cy={0} cx={0} fill="#901e44" />
            <circle r={700} cy={0} cx={0} fill="#801843" />
            <circle r={600} cy={0} cx={0} fill="#6f1341" />
            <circle r={500} cy={0} cx={0} fill="#5e0f3d" />
            <circle r={400} cy={0} cx={0} fill="#4e0c38" />
            <circle r={300} cy={0} cx={0} fill="#3e0933" />
            <circle r={200} cy={0} cx={0} fill="#2e062c" />
            <circle r={100} cy={0} cx={0} fill="#210024" />
          </g>
        </svg>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    width: 100%;
    height: 155px;
    background: lightgrey;
    position: relative;
    border-radius: 15px;
    overflow: hidden;
  }

  .foreground {
    border-radius: 15px;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.18);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(2.8px);
    -webkit-backdrop-filter: blur(2.8px);
    padding: 16px;
    color: white;
  }

  .credit-card-header {
    display: flex;
    justify-content: space-between;
  }

  .credit-card-chip-container {
    margin: 8px 0;
    height: 40px;
    width: 40px;
  }

  .chip {
    width: 100%;
    height: 100%;
  }

  .category,
  .bank {
    font-size: smaller;
  }

  .info-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .names {
    align-self: flex-end;
    text-transform: uppercase;
    font-size: smaller;
  }

  .serial {
    align-self: flex-end;
    letter-spacing: 2px;
    font-size: 15px;
    font-family: monospace;
  }

  .expire {
    margin-left: 3px;
    font-size: smaller;
  }
`;

export default VNBankCard;
