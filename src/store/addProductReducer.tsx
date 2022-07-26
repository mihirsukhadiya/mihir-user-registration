import { GET_ALL_PRODUCT_DATA, EDIT_PRODUCT_DATA } from "./addProductType";

let mainData = [
  {
    userId: "6ddca37b-8f02-43de-9ea1-81837c743026",
    firstName: "John",
    lastName: "Appleseed",
    userGroup: "Operator",
    userAuthorizations: [
      {
        authorizationKey: "jumping",
        granted: false,
      },
      {
        authorizationKey: "standing",
        granted: true,
      },
      {
        authorizationKey: "sitting",
        granted: false,
      },
      {
        authorizationKey: "running",
        granted: true,
      },
    ],
  },
  {
    userId: "cc07b3c3-3e8a-49dc-aad9-e7af72b55002",
    firstName: "Janet",
    lastName: "Williams",
    userGroup: "Administrator",
    userAuthorizations: [
      {
        authorizationKey: "jumping",
        granted: true,
      },
      {
        authorizationKey: "standing",
        granted: false,
      },
      {
        authorizationKey: "sitting",
        granted: true,
      },
      {
        authorizationKey: "running",
        granted: false,
      },
    ],
  },
];

const initialState: any = {
  data: mainData,
};

export default function addProductReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_ALL_PRODUCT_DATA: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    }
    case EDIT_PRODUCT_DATA: {
      state.data.map((datas: any) => {
        if (datas.userId === action.payload.userId) {
          datas.firstName = action.payload.firstName;
          datas.lastName = action.payload.lastName;
          datas.userGroup = action.payload.userGroup;
          datas.userAuthorizations = action.payload.userAuthorizations;
        }
      });
      return state;
    }
    default:
      return state;
  }
}
