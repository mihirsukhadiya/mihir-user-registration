import { useDispatch, useSelector } from "react-redux";
import ChoosePerson from "./ChoosePerson";
import "./index.css";
import { useNavigate } from "react-router";
import AddIcon from "./IconAdd.png";

export function AllDataMainPage() {
  const { data }: any = useSelector((state) => state);
  const navigate = useNavigate();
  return (
    <>
      <div className="mainContainer">
        <div className="contentDiv">
          <div className="title">
            <div>
              <h1> All User Data</h1>
            </div>
            <div>
              <img
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/add-data")}
                src={AddIcon}
                alt="add"
              />
            </div>
          </div>
          <ChoosePerson totalMainData={data} />
        </div>
      </div>
    </>
  );
}
