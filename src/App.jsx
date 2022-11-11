import { useState } from 'react'
import { useQuery } from 'react-query'
import Game from './components/Game.jsx'
import Home from './components/Home.jsx'

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

function App() {
	const [gameState, setGameState] = useState('home')
	const [anime, setAnime] = useState([])
	let content

	const { data: first } = useQuery(
		'first',
		() => fetch('https://api.jikan.moe/v4/top/anime?type=tv&page=1')
			.then((res) => res.json()),
		{
			staleTime: Infinity,
			cacheTime: 360000
		}
	)

	const { isSuccess, data: second } = useQuery(
		'second',
		() => fetch('https://api.jikan.moe/v4/top/anime?type=tv&page=2')
			.then((res) => res.json()),
		{
			staleTime: Infinity,
			cacheTime: 360000,
			enabled: !!first
		}
	)

	async function getAnime() {
		setAnime(shuffle([...first.data, ...second.data]))
		setGameState('play')
	}

	switch (gameState) {
	case 'play':
		content =	<Game anime={anime} back={setGameState} />
		break

	case 'lose':
		content = <Home />
		break

	default:
		content = <Home play={getAnime} success={isSuccess} />
		break
	}

	return (
		<>
			{ content }
		</>
	)
}

export default App
