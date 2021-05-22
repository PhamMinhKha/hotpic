import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { onPageLoad } from 'meteor/server-render';
import App from '../imports/ui/App.jsx';
onPageLoad(sink => {
  sink.renderIntoElementById('react-target', renderToNodeStream(
    <App location={sink.request.url} />
  ));
});