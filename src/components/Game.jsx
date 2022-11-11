import { ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Game.module.css'
import Tile from './Tile'

function Game({ anime, back, lose }) {
	const [index, setIndex] = useState(0)
	const [left, setLeft] = useState(anime[ index ])
	const [right, setRight] = useState(anime[ index + 1 ])

	useEffect(() => {
		setLeft(anime[ index ])
		setRight(anime[ index + 1 ])
	}, [index])

	function handleNext(option) {
		if (option === 'higher') {
			if (left.rank > right.rank) {
				setIndex(index + 1)
			} else {
				lose('lose')
			}
		} else {
			if (left.rank > right.rank) {
				lose('lose')
			} else {
				setIndex(index + 1)
			}
		}
	}

	return (
		<main className={styles.game}>
			<Tile left={true} anime={left} />
			<Tile left={false} anime={right} next={handleNext} />
			<button className={styles.back} onClick={() => back('home')}>
				<ChevronDoubleLeftIcon className={styles.backArrow} />
			</button>
			<div className={styles.versus_circle}>
				<span className={styles.versus_text}>VS</span>
			</div>
		</main>
	)
}

Game.propTypes = {
	anime: PropTypes.array,
	back: PropTypes.func,
	lose: PropTypes.func
}

export default Game
