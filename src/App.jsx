import { useState } from 'react'
import { useQuery } from 'react-query'
import Game from './components/Game.jsx'
import Home from './components/Home.jsx'
import Lose from './components/Lose.jsx'


function App() {
	const [gameState, setGameState] = useState('home')
	const [anime, setAnime] = useState([])
	const [score, setScore] = useState(0)
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

	function getAnime() {
		setAnime([...first.data, ...second.data])
		setGameState('play')
	}

	function handleLose(score) {
		setScore(score)
		setGameState('lose')
	}

	switch (gameState) {
	case 'play':
		content =	<Game data={anime} back={setGameState} lose={handleLose} />
		break

	case 'lose':
		content = <Lose play={setGameState} back={setGameState} score={score} />
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
