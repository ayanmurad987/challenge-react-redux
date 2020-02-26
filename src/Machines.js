import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Machines as machinesAction } from './store/action'
import Health from './components/Health'
import { useHistory } from 'react-router-dom'
import './Machines.css'

export default function Machines() {
	let machines = useSelector(state => state.machine.data)
	const dispatch = useDispatch()
	const history = useHistory()

	const URL = 'ws://localhost:1337'
	const ws = new WebSocket(URL)

	const getMachines = useCallback(
		() => dispatch(machinesAction.getAll()),
		[dispatch]
	)

	useEffect(() => {
		getMachines()
		UpdatingData()

		return () => ws.close()
	}, [getMachines])


	const viewDetails = (value) => {
		history.push(`/machines/${value.id}`)
	}

	const setColor = (value) => {
		if (value >= 0 && value <= 50) return '#5cb85c'
		if (value >= 51 && value <= 70) return '#f0ad4e'
		if (value >= 71 && value <= 100) return '#f0ad4e'
	}

	const UpdatingData = () => {
		ws.onmessage = res => {
			const data = JSON.parse(res.data)
			const el = document.getElementById(data.id)
			el.setAttribute('style', `width: ${data.health}%; background-color: ${setColor(data.health)}`)
		}
	}

	const renderList = () => {
		return machines.length && machines.map((value, index) =>
			<div key={index} className='listBody' onClick={() => viewDetails(value)}>
				<label >{value.name}</label>
				<label>{value.ip_address}</label>
				<label><Health id={value.id} value={value.health} /></label>
			</div>
		)
	}

	return (
		<div>
			<div className='listHead'>
				<label>Name</label>
				<label>IP Address</label>
				<label>Health</label>
			</div>
			{renderList()}
		</div>
	);
}
