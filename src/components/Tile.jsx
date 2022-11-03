import styles from './Tile.module.css'
import PropTypes from 'prop-types'

function Tile({ left }) {
	return (
		<section className={styles.tile}>
			<h1 className={styles.title}>Anime</h1>
			{left
				?
				<>
					<p className={styles.description}>Has a rank of</p>
					<p className={styles.rank}>50</p>
				</>
				:
				<>
					<p>has a</p>
					<button className={styles.higher}>Higher</button>
					<button className={styles.lower}>Lower</button>
					<p>rank</p>
				</>
			}
			<div className={styles.overlay}></div>
		</section>
	)
}

Tile.propTypes = { left: PropTypes.bool }

export default Tile
