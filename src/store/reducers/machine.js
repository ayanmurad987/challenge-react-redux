import Constants from '../constants';

const initialState = {
	isLoading: false,
	isError: false,
	isSuccess: false,
	data: []
}

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case Constants.Machine.GET_MACHINE_REQUEST:
			return { ...state, isLoading: true }
		case Constants.Machine.GET_MACHINE_FAILED:
			return { ...state, isLoading: false, isError: true }
		case Constants.Machine.GET_MACHINE_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				data: payload
			};
		case Constants.Machine.GET_SINGLE_MACHINE_REQUEST:
			return { ...state, isLoading: true }
		case Constants.Machine.GET_SINGLE_MACHINE_FAILED:
			return { ...state, isLoading: false, isError: true }
		case Constants.Machine.GET_SINGLE_MACHINE_SUCCESS:
			return {
				...state,
				isLoading: false,
				isError: false,
				data: [...state.data.filter(d => d.id !== payload.id), payload]
			};

      case Constants.Machine.UPDATE_SINGLE_MACHINE_REQUEST:
        return { ...state, isLoading: true }
      case Constants.Machine.UPDATE_SINGLE_MACHINE_FAILED:
        return { ...state, isLoading: false, isError: true }
      case Constants.Machine.UPDATE_SINGLE_MACHINE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          data: [...state.data.filter(d => d.id !== payload.id), payload]
        };
  
		default:
			return state
	}
};
