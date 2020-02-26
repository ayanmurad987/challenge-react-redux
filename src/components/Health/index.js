import React from 'react'
import './index.css'

export default function Health(props) {
	const { value, id } = props
	const setColor = () => {
		if (value >= 0 && value <= 50) return '#5cb85c'
		if (value >= 51 && value <= 70) return '#f0ad4e'
		if (value >= 71 && value <= 100) return '#f0ad4e'
	}
	return (
		<div className='healthBar'>
			<div id={id} style={{width:`${value}%`, backgroundColor: setColor()}}></div>
		</div>
	)
}
