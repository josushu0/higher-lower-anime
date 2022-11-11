import PropTypes from 'prop-types'
import styles from './Lose.module.css'

function Lose({ play, back, score }) {
	if (localStorage.getItem('highScore') < score) {
		localStorage.setItem('highScore', score)
	}

	function goHome() {
		back('home')
	}

	function playAgain() {
		play('play')
	}

	return (
		<main className={styles.lose}>
			<h1 className={styles.title}>Game Over :(</h1>
			<div className={styles.scores}>
				<span className={styles.score}>Score: {score}</span>
				<span className={styles.score}>Max Score: {localStorage.getItem('highScore')}</span>
			</div>
			<button className={styles.play} onClick={playAgain}>Try again</button>
			<button className={styles.back} onClick={goHome}>Return Home</button>
		</main>
	)
}

Lose.propTypes = {
	play: PropTypes.func,
	back: PropTypes.func,
	score: PropTypes.number
}

export default Lose
