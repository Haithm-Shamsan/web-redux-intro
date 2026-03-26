import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdrow(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        state.loan = action.payload.amount; // Correctly accessing payload properties
        state.loanPurpose = action.payload.loanPurpose;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state, action) {
      if (state.balance < action.balance) return;
      state.loanPurpose = "";
      state.balance -= state.loan;
      state.loan = 0;
    },
    convertingCurrency(state) {},
  },
});

export default function accountReducer(state = initialState, action) {
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

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/convertingCurrency" });
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export function withdrow(amount) {
  return { type: "account/withdrow", payload: amount };
}
export function requestLoan(amount, loanPurpose) {
  console.log(amount);
  return {
    type: "account/requestLoan",
    payload: { amount, loanPurpose },
  };
}
export function payLoan(amount) {
  return { type: "account/payLoan", payload: amount };
}

// export default accountSlice.reducer;
