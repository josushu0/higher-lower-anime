import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'
import { useState, useMemo } from 'react'
import styles from './Game.module.css'
import Tile from './Tile'

function shuffle(data) {
	let length = data.length
	let random
	let element
	while (length) {
		random = Math.floor(Math.random() * length--)
		element = data[ length ]
		data[ length ] = data[ random ]
		data[ random ] = element
	}

	return data
}

function Game({ data, back, lose }) {
	const anime = useMemo(() => shuffle(data), [data])
	const [index, setIndex] = useState(0)
	const [score, setScore] = useState(0)
	const left = anime[ index ]
	const right = anime[ index + 1 ]

	function handleNext(option) {
		if (option === 'higher') {
			if (left.rank > right.rank) {
				setScore(score + 1)
				setIndex(index + 1)
			} else {
				lose(score)
			}
		} else {
			if (left.rank > right.rank) {
				lose(score)
			} else {
				setScore(score + 1)
				setIndex(index + 1)
			}
		}
	}

	return (
		<main className={styles.game}>
			<Tile left={true} anime={left} />
			<Tile left={false} anime={right} next={handleNext} />
			<button aria-label='Return to home' className={styles.back} onClick={() => back('home')}>
				<ChevronDoubleLeftIcon className={styles.backArrow} />
			</button>
			<div aria-hidden='true' className={styles.versus_circle}>
				<span className={styles.versus_text}>VS</span>
			</div>
			<p className={styles.score}>Score: {score}</p>
		</main>
	)
}

Game.propTypes = {
	data: PropTypes.array,
	back: PropTypes.func,
	lose: PropTypes.func
}

export default Game
