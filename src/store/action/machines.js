import Constants from '../constants'
const getAll = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: Constants.Machine.GET_MACHINE_REQUEST, payload: null
	})
	try {
		fetch("http://localhost:8080/machines")
			.then(response => response.json())
			.then(json => {
				dispatch({
					type: Constants.Machine.GET_MACHINE_SUCCESS,
					payload: json
				})
			})
	} catch (error) {
		dispatch({
			type: Constants.Machine.GET_MACHINE_FAILED,
			payload: null
		})
	}
	}
}

const get = id => {
	return async (dispatch, getState) => {
		dispatch({
			type: Constants.Machine.GET_SINGLE_MACHINE_REQUEST,
			payload: null
		})
		try {
			fetch(`http://localhost:8080/machines/${id}`)
				.then(response => response.json())
				.then(json => {
					dispatch({
						type: Constants.Machine.GET_SINGLE_MACHINE_SUCCESS,
						payload: json
					})
				})
		} catch (error) {
			dispatch({
				type: Constants.Machine.GET_SINGLE_MACHINE_FAILED,
				payload: null
			})
		}
	}
}

const update = payload => {
	return async (dispatch, getState) => {
		dispatch({
			type: Constants.Machine.UPDATE_SINGLE_MACHINE_REQUEST,
			payload: null
		})
		try {
			const data = {}
			if (payload.name) data.name = payload.name
			if (payload.health) data.health = payload.health

			fetch(`http://localhost:8080/machines/${payload.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then(response => response.json())
				.then(json => {
					dispatch({
						type: Constants.Machine.UPDATE_SINGLE_MACHINE_SUCCESS,
						payload
					})
				})
		} catch (error) {
			dispatch({
				type: Constants.Machine.UPDATE_SINGLE_MACHINE_FAILED,
				payload: null
			})
		}
	}
}
export default { getAll, get, update }
