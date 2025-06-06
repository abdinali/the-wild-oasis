import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ErrorFallback from './ui/ErrorFallback';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.replace('/')}>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);
