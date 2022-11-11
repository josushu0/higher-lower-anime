import PropTypes from 'prop-types'
import styles from './Lose.module.css'

function Lose({ play, back }) {
	function goHome() {
		back('home')
	}

	function playAgain() {
		play('play')
	}

	return (
		<main className={styles.lose}>
			<h1 className={styles.title}>Game Over :(</h1>
			<button className={styles.play} onClick={playAgain}>Try again</button>
			<button className={styles.back} onClick={goHome}>Return Home</button>
		</main>
	)
}

Lose.propTypes = {
	play: PropTypes.func,
	back: PropTypes.func
}

export default Lose
