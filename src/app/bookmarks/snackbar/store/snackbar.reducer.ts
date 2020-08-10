import { SnackbarState } from './snackbar-state.interface';
import { SnackbarAction, SnackbarActionTypes } from './snackbar.action';

const initialState: SnackbarState = {
  show: false,
};

export function reducer(
  state: SnackbarState = initialState,
  action: SnackbarAction
): SnackbarState {
  switch (action.type) {
    case SnackbarActionTypes.SnackbarClose:
      return { ...state, show: false };
    case SnackbarActionTypes.SnackbarOpen:
      return { ...state, show: true };
    default:
      return state;
  }
}
