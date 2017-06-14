import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import ImageContainer from './containers/ImageContainer';
import ImageSlideContainer from './containers/ImageSlideContainer';
import VideoContainer from './containers/VideoContainer';
import SettingsContainer from './containers/SettingsContainer';

export default () => (
  <App>
    <Switch>
      <Route path="/image" component={ImageContainer} />
      <Route path="/imageSlide" component={ImageSlideContainer} />
      <Route path="/video" component={VideoContainer} />
      <Route path="/settings" component={SettingsContainer} />
      <Route path="/" component={ImageContainer} />
    </Switch>
  </App>
);
