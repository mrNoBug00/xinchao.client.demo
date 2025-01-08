import React from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";

const Button = () => {

  const t = useTranslations("ProductPage");
  return (
    <StyledWrapper>
      <button className="learn-more text-[#162b75]">
        <span aria-hidden="true" className="circle">
          <span className="icon arrow" />
        </span>
        <span className="button-text text-[#162b75]">{t("see more")}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    background: transparent;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
    margin: 1rem;
  }

  button.learn-more {
    width: 12rem;
    height: auto;
  }

  button.learn-more .circle {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    box-shadow: 0 0 5px 1px white;
    position: relative;
    display: block;
    margin: 0;
    width: 3rem;
    height: 3rem;
    background: #282936;
    border-radius: 1.625rem;
  }

  button.learn-more .circle .icon {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
  }

  button.learn-more .circle .icon.arrow {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    left: 0.625rem;
    width: 1.125rem;
    height: 0.125rem;
    background: none;
  }

  button.learn-more .circle .icon.arrow::before {
    position: absolute;
    content: "";
    top: -0.29rem;
    right: 0.0625rem;
    width: 0.625rem;
    height: 0.625rem;
    border-top: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    transform: rotate(45deg);
  }

  button.learn-more .button-text {
    transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.75rem 0;
    margin: 0 0 0 1.85rem;
    color: #162b75;
    font-weight: 700;
    line-height: 1.6;
    text-align: center;
    text-transform: uppercase;
  }

  button:hover .circle {
    width: 100%;
    box-shadow: 0 0 10px 2px white;
  }

  button:hover .button-text {
    transform: translate(-1.7rem, 0);
  }

  button:hover .circle .icon.arrow {
    background: #fff;
    transform: translate(8.7rem, 0);
  }

  button:active .circle .icon.arrow {
    transform: translate(9.5rem, 0);
    transition: all 0.3s;
  }

  button:active .circle {
    transform: scale(0.9);
    transition: all 0.3s;
    box-shadow: 0 0 5px 0.5px white;
  }

  button:hover .button-text {
    color: #fff;
  }

  button:active .button-text {
    color: rgba(255, 255, 255, 0.459);
  }

  // Media Query for Mobile Devices
  @media (max-width: 768px) {
    button.learn-more .circle {
      display: none; // Ẩn vòng tròn và mũi tên
    }

    button.learn-more .button-text {
      margin: 0; // Căn chỉnh lại nút
    }
  }
`;

export default Button;
