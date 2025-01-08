import React from "react";
import styled from "styled-components";
import { SlCalender } from "react-icons/sl";

const Button = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <div className="arrowContainer">
          <svg
            width={15}
            height={15}
            viewBox="0 0 45 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M43.7678 20.7678C44.7441 19.7915 44.7441 18.2085 43.7678 17.2322L27.8579 1.32233C26.8816 0.34602 25.2986 0.34602 24.3223 1.32233C23.346 2.29864 23.346 3.88155 24.3223 4.85786L38.4645 19L24.3223 33.1421C23.346 34.1184 23.346 35.7014 24.3223 36.6777C25.2986 37.654 26.8816 37.654 27.8579 36.6777L43.7678 20.7678ZM0 21.5L42 21.5V16.5L0 16.5L0 21.5Z"
              fill="black"
            />
          </svg>
        </div>

        <div className="bgContainer mr-4 ml-4">
          <SlCalender />
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.5em 0.5em 0.5em 0.5em; /* Giảm padding */
    background-color: yellow;
    cursor: pointer;
    box-shadow: 2px 3px 0px black; /* Giảm kích thước shadow */
    border: 2px solid; /* Giảm độ dày border */
    border-radius: 10px; /* Giảm độ bo góc */
    position: relative;
    overflow: hidden;
    z-index: 100;
    transition: box-shadow 250ms, transform 250ms, filter 50ms;
  }
  button:hover {
    transform: translate(1px, 1px); /* Giảm hiệu ứng hover */
    box-shadow: 1px 2px 0px black; /* Giảm shadow khi hover */
  }
  button:active {
    filter: saturate(0.75);
  }
  button::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: pink;
    z-index: -1;
    transform: translateX(-100%);
    transition: transform 250ms;
  }
  button:hover::after {
    transform: translateX(0);
  }
  .bgContainer {
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    overflow: hidden;
    max-width: 30%; /* Giảm chiều rộng */
    font-size: 1.5em; /* Giảm kích thước font */
    font-weight: 500; /* Giảm độ dày font */
  }
  .bgContainer span {
    position: relative;
    transform: translateX(-100%);
    transition: all 250ms;
  }
  .button:hover .bgContainer > span {
    transform: translateX(0);
  }
  .arrowContainer {
    padding: 0.5em; /* Giảm padding */
    margin-inline-end: 0.5em; /* Giảm khoảng cách */
    border: 2px solid; /* Giảm độ dày border */
    border-radius: 50%;
    background-color: pink;
    position: relative;
    overflow: hidden;
    transition: transform 250ms, background-color 250ms;
    z-index: 100;
  }
  .arrowContainer::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: yellow;
    transform: translateX(-100%);
    z-index: -1;
    transition: transform 250ms ease-in-out;
  }
  button:hover .arrowContainer::after {
    transform: translateX(0);
  }
  button:hover .arrowContainer {
    transform: translateX(3px); /* Giảm hiệu ứng hover */
  }
  button:active .arrowContainer {
    transform: translateX(5px);
  }
  .arrowContainer svg {
    width: 12px; /* Giảm kích thước icon */
    height: 12px;
    vertical-align: middle;
  }
`;

export default Button;
