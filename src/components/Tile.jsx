import styles from './Tile.module.css'
import PropTypes from 'prop-types'

function Tile({ left, anime, next }) {
	return (
		<section className={styles.tile}
			style={{
				backgroundImage: `url(
					${anime.images.webp.large_image_url || anime.images.jpg.large_image_url}
				)`,
				backgroundSize: 'cover'
			}}>
			<div className={styles.overlay}></div>
			<h1 className={styles.title}>{anime.title_english || anime.title}</h1>
			{left
				?
				<>
					<p className={styles.description}>Has a rank of</p>
					<p className={styles.rank}>{anime.rank}</p>
				</>
				:
				<>
					<p>has a</p>
					<button className={styles.higher} onClick={() => next('higher')}>Higher</button>
					<button className={styles.lower} onClick={() => next('lower')}>Lower</button>
					<p>rank</p>
				</>
			}
		</section>
	)
}

Tile.propTypes = {
	left: PropTypes.bool,
	anime: PropTypes.object,
	next: PropTypes.func
}

export default Tile
