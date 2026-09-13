import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import keycloak from './auth/keycloak';

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = (authenticated = false) => {
  root.render(
    <React.StrictMode>
      <App keycloak={keycloak} authenticated={authenticated} />
    </React.StrictMode>
  );
};

// Immediately render the public Academy landing page
renderApp(false);

// Initialize Keycloak with silent iframe SSO check and disable fallback redirect
keycloak.init({
  onLoad: 'check-sso',
  silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
  silentCheckSsoFallback: false,
  checkLoginIframe: false,
  pkceMethod: 'S256'
}).then((authenticated) => {
  if (authenticated) {
    renderApp(true);
  }
}).catch((err) => {
  console.warn('Keycloak SSO initialization warning (public mode active):', err);
});
