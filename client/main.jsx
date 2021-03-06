import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM, { render } from 'react-dom';
import { App } from '/imports/ui/App';
import { onPageLoad } from "meteor/server-render"; 
// import i18n (needs to be bundled ;)) 
import './i18n';
Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});