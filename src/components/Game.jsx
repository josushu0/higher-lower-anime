import styles from './Game.module.css'
import Tile from './Tile'

function Game() {
	return (
		<main className={styles.game}>
			<Tile left={true} />
			<Tile left={false} />
			<div className={styles.versus_circle}>
				<span className={styles.versus_text}>VS</span>
			</div>
		</main>
	)
}

export default Game
