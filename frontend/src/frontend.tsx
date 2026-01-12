import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SideBar } from './components/SideBar';
import './styles/global.css';

function App() {
	return (
		<div className="app">
			<SideBar />
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
