import React from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";

interface ButtonGoToMapProps {
  label?: string;
  className?: string;
}

const ButtonGoToMap: React.FC<ButtonGoToMapProps> = ({
  label,
  className = "",
}) => {

    const t = useTranslations("Contact");
  const handleClick = () => {
    const address = "台中市潭子區雅潭路三段88號";
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      address
    )}`;
    window.open(mapsUrl, "_blank", "noopener,noreferrer");
  };
  return (
    <StyledWrapper>
      <button onClick={handleClick}>
        <span>{t("Go to google map")}</span>
        <span className="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="svg-icon">
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    font-size: 18px;
    color: grey;
    font-family: Poppins;
    font-weight: 400;
    cursor: pointer;
    position: relative;
    border: none;
    background: none;

    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 400ms;
    transition-property: color;
    display: inline-flex;
    align-items: center;
  }

  button:focus,
  button:hover {
    color: blue;
  }

  button:focus:after,
  button:hover:after {
    width: 100%;
    right: ;
    left: auto; /* Ensure left is auto to override the initial value */
  }

  button:after {
    content: "";
    pointer-events: none;
    bottom: -7px;
    right: auto; /* Start from the right */
    left: 0; /* Ensure left is auto to override the initial value */
    position: absolute;
    width: 0%;
    height: 1px;
    background-color: #fff;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 500ms;
    transition-property: width, right;
  }

  .svg-icon {
    width: 0.9em;
    height: 0.8em;
    margin-left: 10px;
    fill: grey;
    transform: rotate(-45deg);
    transition: transform 0.5s ease-out;
  }

  button:hover .svg-icon {
    transform: rotate(0deg);
    fill: blue;
  }
`;

export default ButtonGoToMap;
