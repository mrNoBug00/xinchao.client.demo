import React from "react";
import styled from "styled-components";
import { BsPinMapFill } from "react-icons/bs";


const GoToMapButton = () => {
  return (
    <StyledWrapper>
      <button>
        <a href="#">
          <BsPinMapFill />
        </a>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    position: relative;
    border: none;
    margin: 10px;
    background-color: transparent;
  }

  button a {
    width: 40px;
    height: 40px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 5px 45px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    transition: 0.5s;
    overflow: hidden;
    background-color: rgba(255, 255, 255, 0.1);
  }

  button a:hover {
    transform: translateY(-20px);
  }

  button a::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    transform: skewX(45deg) translateX(150px);
    transition: 0.5s ease;
  }

  button a:hover::before {
    transform: skewX(45deg) translateX(-150px);
  }

  button a svg {
    width: 3em;
  }

  #facebook {
    color: rgba(10, 128, 236, 0.7);
  }
`;

export default GoToMapButton;
