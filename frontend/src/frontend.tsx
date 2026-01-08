import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { APITester } from './APITester';

function App() {
	return (
		<div className="app">
			<div className="logo-container">
				<h1>EFAA Frontend</h1>
			</div>
			<APITester />
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
