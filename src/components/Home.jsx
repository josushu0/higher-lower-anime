import { ArrowLongUpIcon, ArrowLongDownIcon } from '@heroicons/react/24/solid'
import PropTypes from 'prop-types'
import styles from './Home.module.css'

function Home({ play, success }) {
	let content = <></>
	if (!success) {
		content = <div className={styles.spinner}>
			<div className={styles.bounce1}></div>
			<div className={styles.bounce2}></div>
			<div className={styles.bounce3}></div>
		</div>
	} else {
		content = 'Play'
	}

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
				<button className={styles.optionsPlay} disabled={!success} onClick={() => play()}>
					{content}
				</button>
				<p style={{ display: `${success ? 'none' : 'block'}` }}>Loading anime...</p>
			</section>
		</main>
	)
}

Home.propTypes = {
	play: PropTypes.func,
	success: PropTypes.bool
}

export default Home
