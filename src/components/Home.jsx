import { ArrowLongUpIcon, ArrowLongDownIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'
import styles from './Home.module.css'

function Home({ play }) {
	return (
		<main className={styles.home}>
			<section className={styles.title}>
				<ArrowLongUpIcon className={styles.arrowUp}/>
				<h1 className={styles.titleText}>Higher Lower Anime</h1>
				<ArrowLongDownIcon className={styles.arrowDown}/>
			</section>
			<section className={styles.description}>
				<p>A game of higher or lower based on
					<a href='http://www.higherlowergame.com/'> The Higher Lower Game </a>
					with anime rankings from
					<a href='https://myanimelist.net/'> MyAnimeList.</a>
				</p>
			</section>
			<section className={styles.options}>
				<button className={styles.optionsPlay} onClick={() => play('play')}>Play</button>
			</section>
		</main>
	)
}

Home.propTypes = { play: PropTypes.func }

export default Home
