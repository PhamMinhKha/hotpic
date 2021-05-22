import React from 'react';
import ReactDOM from 'react-dom';
import { onPageLoad } from 'meteor/server-render';
import { renderToString } from 'react-dom/server'
onPageLoad(async sink => {
  const App = (await import('../imports/ui/App.jsx')).default;
  ReactDOM.hydrate(
    renderToString(sheet.collectStyles(<App />)),
    document.getElementById('react-target')
  );
});