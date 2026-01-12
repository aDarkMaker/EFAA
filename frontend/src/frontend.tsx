import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';

function App() {
	return (
		<div className="app">
			<div className="logo-container">
				<h1>EFAA</h1>
			</div>
		</div>
	);
}

const rootElement = document.getElementById('root');
if (rootElement) {
	const root = createRoot(rootElement);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}
