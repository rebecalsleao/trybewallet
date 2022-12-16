import { WALLET_ACTION, EXPENSE_ACTION, DELETE_ACTION } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_ACTION:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSE_ACTION:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_ACTION:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
