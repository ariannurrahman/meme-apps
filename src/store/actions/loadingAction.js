import { LOADING_MAIN, LOADING_SUB, LOADING_PROGRESS } from "./types";

export const mainLoading = (isLoading) => {
  return {
    type: LOADING_MAIN,
    payload: isLoading,
  };
};

export const subLoading = (isLoading) => (dispatch) => {
  dispatch({
    type: LOADING_SUB,
    payload: isLoading,
  });
};

export const progressLoading = (percentage) => (dispatch) => {
  dispatch({
    type: LOADING_PROGRESS,
    payload: percentage,
  });
};
