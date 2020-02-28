import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Machines as machinesActions } from '../../store/action'

import Health from '../Health'
import { useParams } from 'react-router-dom'
import './index.css'

export default function MachineDetails () {
	const { id } = useParams()
	const URL = 'ws://localhost:1337'
	const ws = new WebSocket(URL)
	const [machineName, setMachinesName] = useState('')
	const dispatch = useDispatch()
	
	const machineDetails = useSelector(state =>
		state.machine.data.find(machine => machine.id === id)
	)
	const getMachines = useCallback(() => dispatch(machinesActions.get(id)), [
		dispatch, id
	])
	const updateMachines = useCallback(
		props => dispatch(machinesActions.update(props)),
		[dispatch]
	)

	useEffect(() => {
		getMachines()
	}, [getMachines])

	useEffect(() => {
		UpdatingData()
		return () => ws.close()
	})

	const setColor = (value) => {
		if (value >= 0 && value <= 50) return '#5cb85c'
		if (value >= 51 && value <= 70) return '#f0ad4e'
		if (value >= 71 && value <= 100) return '#f0ad4e'
	}

	const UpdatingData = () => {
		ws.onmessage = res => {
			const data = JSON.parse(res.data)
			if (machineDetails && machineDetails.id === data.id) {
				const el = document.getElementById(data.id)
				const HealthNumber = document.getElementById('HealthNumber')
				HealthNumber.innerHTML = data.health
				el.setAttribute('style', `width: ${data.health}%; background-color: ${setColor(data.health)}`)
			}
		}
	}

	const changeName = () => {
		if (machineName) {
			const data = { ...machineDetails, name: machineName }
			updateMachines(data)
		}
	}

	if (!machineDetails) return <h2>loading...</h2>
	return (
		<div className='mainMachineDetails'>
			<div>
				<h2>{machineDetails.name}</h2>
				<h3>Update Device</h3>
				<div className='machineUpdate'>
					<label>Name: </label>
					<input type='text' placeholder={machineDetails.name}
						value={machineName}
						onChange={e => setMachinesName(e.target.value)}
					/>
					<button className='submit' onClick={changeName}>Submit</button>
				</div>
			</div>
			<div className='healthMain'>
				<div>
					<div className='healthBox'>
						<h2 id={'HealthNumber'}>{machineDetails.health}</h2>
						<div><Health id={machineDetails.id} value={machineDetails.health} /></div>
					</div>
				</div>
				<div>
					<h3>Stats</h3>
					<p>{`IP Address: ${machineDetails.ip_address}`}</p>
				</div>
			</div>
		</div>
	)
}
