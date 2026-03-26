import { combineReducers, createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdrow":
      if (state.balance < action.payload) return;
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      if (state.loan < 0) return state;
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

const initialStateCustomer = {
  fullName: "",
  nationalID: null,
  createdAt: null,
};
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payLoan.fullName,
      };

    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);
console.log(store.getState());

function deposit(amount) {
  return { type: "account/deposit", payload: Number(amount) };
}
function withdorw(amount) {
  return { type: "account/withdrow", payload: Number(amount) };
}
function requestLoan(amount, loanPurpose) {
  amount = Number(amount);
  return {
    type: "account/requestLoan",
    payload: { amount, loanPurpose },
  };
}
function payLoan(amount) {
  return { type: "pay/Loan", payload: Number(amount) };
}

function createCustomer(fullName, nationalID, createdAt) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date() },
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

store.dispatch(createCustomer("Haythm Shamsan", 1));
console.log(store.getState());
store.dispatch(deposit(1000000));
console.log(store.getState());
