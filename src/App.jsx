import { useState } from 'react'
import Home from './components/Home.jsx'

function App() {
	const [gameState, setGameState] = useState('home')
	let content

	switch (gameState) {
	case 'play':
		content = <Home />
		break

	case 'lose':
		content = <Home />
		break

	default:
		content = <Home play={setGameState} />
		break
	}

	return (
		<>
			{ content }
		</>
	)
}

export default App
