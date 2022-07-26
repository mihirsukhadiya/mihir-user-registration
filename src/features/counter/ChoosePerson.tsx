import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router";
import Lost from "./Lost.gif";

const ChoosePerson = ({ totalMainData }: any) => {
  const navigate = useNavigate();
  const editCard = (data: any) => {
    navigate(`/edit-data/${data.userId}`)
  };
  return (
    <>
      <div className="mainPersonDiv">
        <div className="imageDiv">
          <img className="images" src={Lost} alt="Lost" />
        </div>
        <div className="mainDivCard">
          {totalMainData?.map((data: any, index: any) => {
            return (
              <div
                className="mainCard"
                key={index}
                onClick={() => editCard(data)}
              >
                <div className="circleClass">{data.firstName.substr(0, 1)}</div>
                <div>{`${data.firstName} ${data.lastName}`}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChoosePerson;
