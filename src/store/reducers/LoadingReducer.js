import { LOADING_MAIN, LOADING_SUB, LOADING_PROGRESS } from "../actions/types";

const INITIAL_STATE = {
  loadingMain: false,
  loadingSub: false,
  loadingProgress: 0,
};

const LoadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_MAIN:
      return { ...state, loadingMain: action.payload };
    case LOADING_SUB:
      return { ...state, loadingSub: action.payload };
    case LOADING_PROGRESS:
      return { ...state, loadingProgress: action.payload };

    default:
      return state;
  }
};

export default LoadingReducer;
