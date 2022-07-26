import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllProductsData,
  editProductData,
} from "../../store/addProductAction";
import { v4 } from "uuid";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import LeftArrow from "./LeftArrow.png";

const FormData = () => {
  const [isEdit, setIsEdit]: any = useState(false);
  const [editData, setEditData]: any = useState();
  let location = useLocation();
  const navigate = useNavigate();
  let params = useParams();
  const { data }: any = useSelector((state) => state);
  const dispatch = useDispatch();
  let initialFormData = {
    userId: v4(),
    firstName: "",
    lastName: "",
    userGroup: "Operator",
    userAuthorizations: "",
  };
  let initialCheckBox = {
    jumping: false,
    standing: false,
    sitting: false,
    running: false,
  };
  const [checkBoxValues, setCheckBoxValues]: any = useState(initialCheckBox);
  const [mainFormData, setMainFormData]: any = useState(initialFormData);

  useEffect(() => {
    const locationData = location.pathname.split("/");
    if (locationData.includes("edit-data")) {
      setIsEdit(true);
      let EditDataUser = data.filter((dat: any) => dat.userId === params.id);
      setEditData(EditDataUser);
      EditDataUser.map((val: any) => {
        initialFormData.userId = val.userId;
        initialFormData.firstName = val.firstName;
        initialFormData.lastName = val.lastName;
        initialFormData.userGroup = val.userGroup;
        initialFormData.userAuthorizations = val.userAuthorizations;
        setCheckBoxValues({
          jumping: val.userAuthorizations[0].granted,
          standing: val.userAuthorizations[1].granted,
          sitting: val.userAuthorizations[2].granted,
          running: val.userAuthorizations[3].granted,
        });
      });
    }
  }, []);

  const saveClick = () => {
    let userPermission = [
      {
        authorizationKey: "jumping",
        granted: checkBoxValues.jumping,
      },
      {
        authorizationKey: "standing",
        granted: checkBoxValues.standing,
      },
      {
        authorizationKey: "sitting",
        granted: checkBoxValues.sitting,
      },
      {
        authorizationKey: "running",
        granted: checkBoxValues.running,
      },
    ];
    mainFormData.userAuthorizations = userPermission;
    dispatch(getAllProductsData(mainFormData));
    resetForm();
    navigate("/");
  };
  const resetForm = () => {
    setCheckBoxValues(initialCheckBox);
    setMainFormData(initialFormData);
  };

  const editFunctionality = (names: any, values: any) => {
    if (isEdit) {
      let newData = {
        userId: params.id,
        firstName: names === "firstName" ? values : mainFormData.firstName,
        lastName: names === "lastName" ? values : mainFormData.lastName,
        userGroup: names === "userGroup" ? values : mainFormData.userGroup,
        userAuthorizations: [
          {
            authorizationKey: "jumping",
            granted: names === "jumping" ? values : checkBoxValues.jumping,
          },
          {
            authorizationKey: "standing",
            granted: names === "standing" ? values : checkBoxValues.standing,
          },
          {
            authorizationKey: "sitting",
            granted: names === "sitting" ? values : checkBoxValues.sitting,
          },
          {
            authorizationKey: "running",
            granted: names === "running" ? values : checkBoxValues.running,
          },
        ],
      };

      dispatch(editProductData(newData));
    }
  };
  return (
    <div className="mainContainer">
      <div className="contentDiv">
        <div className="title" style={{ marginBottom: "35px" }}>
          <div className="imageDiv2">
            <img
              width={50}
              height={50}
              src={LeftArrow}
              alt="LeftArrow"
              onClick={() => navigate("/")}
            />
          </div>
          <div>
            <h1> Add User Data</h1>
          </div>
        </div>
        <div className="mainPersonDiv">
          <div className="formGroup">
            <div className="labelForm">First Name:-</div>
            <div className="">
              <input
                className="inputValue"
                type="text"
                value={mainFormData.firstName}
                name="firstName"
                onChange={(e) => {
                  setMainFormData({
                    ...mainFormData,
                    firstName: e.target.value,
                  });
                  editFunctionality("firstName", e.target.value);
                }}
              />
            </div>
          </div>
          <div className="formGroup">
            <div className="labelForm">Last Name:-</div>
            <div className="">
              <input
                className="inputValue"
                type="text"
                value={mainFormData.lastName}
                name="lastName"
                onChange={(e) => {
                  setMainFormData({
                    ...mainFormData,
                    lastName: e.target.value,
                  });
                  editFunctionality("lastName", e.target.value);
                }}
              />
            </div>
          </div>
          <div className="authorizationGroup">
            <div className="labelForm">Authorizations:-</div>
            <div className="authorizationCard">
              <div className="authMainCard">
                <div className="formGroup">
                  <div className="labelForm">Group:-</div>
                  <div className="">
                    <select
                      name="groups"
                      className="selectGroup"
                      value={mainFormData.userGroup}
                      onChange={(e) => {
                        setMainFormData({
                          ...mainFormData,
                          userGroup: e.target.value,
                        });
                        editFunctionality("userGroup", e.target.value);
                      }}
                    >
                      <option value="Operator">Operator</option>
                      <option value="Administrator">Administrator</option>
                      <option value="Service">Service</option>
                    </select>
                  </div>
                </div>
                <div className="formGroupForCheckbox">
                  <div
                    className="labelForm"
                    style={{ marginBottom: "0px", marginRight: "0px" }}
                  >
                    Permissions:-
                  </div>
                  <div className="">
                    <ul>
                      <li>
                        <input
                          type="checkbox"
                          id="jumping"
                          checked={
                            checkBoxValues.jumping === true ? true : false
                          }
                          name="jumping"
                          value={checkBoxValues.jumping}
                          onChange={(e) => {
                            setCheckBoxValues({
                              ...checkBoxValues,
                              jumping: e.target.checked,
                            });
                            editFunctionality("jumping", e.target.checked);
                          }}
                        />
                        <label htmlFor="jumping">Jumping</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="standing"
                          name="standing"
                          checked={
                            checkBoxValues.standing === true ? true : false
                          }
                          value={checkBoxValues.standing}
                          onChange={(e) => {
                            setCheckBoxValues({
                              ...checkBoxValues,
                              standing: e.target.checked,
                            });
                            editFunctionality("standing", e.target.checked);
                          }}
                        />
                        <label htmlFor="standing">Standing</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="sitting"
                          name="sitting"
                          checked={
                            checkBoxValues.sitting === true ? true : false
                          }
                          value={checkBoxValues.sitting}
                          onChange={(e) => {
                            setCheckBoxValues({
                              ...checkBoxValues,
                              sitting: e.target.checked,
                            });
                            editFunctionality("sitting", e.target.checked);
                          }}
                        />
                        <label htmlFor="sitting">Sitting</label>
                      </li>
                      <li>
                        <input
                          type="checkbox"
                          id="running"
                          name="running"
                          checked={
                            checkBoxValues.running === true ? true : false
                          }
                          value={checkBoxValues.running}
                          onChange={(e) => {
                            setCheckBoxValues({
                              ...checkBoxValues,
                              running: e.target.checked,
                            });
                            editFunctionality("running", e.target.checked);
                          }}
                        />
                        <label htmlFor="running">Running</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isEdit === false ? (
            <div className="buttonGroup">
              <div className="allButton">
                <button className="buttons" onClick={resetForm}>
                  Cancel
                </button>
                <button className="buttons" onClick={saveClick}>
                  Save
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default FormData;
