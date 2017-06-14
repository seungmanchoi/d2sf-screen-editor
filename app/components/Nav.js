import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Tabs, Tab} from 'material-ui/Tabs';

import AvVideoCam from 'material-ui/svg-icons/av/videocam';
import ImageImage from 'material-ui/svg-icons/image/image';
import ImageSlideShow from 'material-ui/svg-icons/image/slideshow';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
// import {browserHistory} from 'react-router';

const styles = {
  tab1: {
    'textTransform': 'capitalize'
  }
};

export default class Nav extends Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  constructor(props) {
    super(props);

    switch (location.pathname) {
      case '/':
        this.state = {initalTab: 1};
        break;
      case '/image':
        this.state = {initalTab: 1};
        break;
      case '/imageSlide':
        this.state = {initalTab: 2};
        break;
      case '/video':
        this.state = {initalTab: 3};
        break;
      case '/settings':
        this.state = {initalTab: 4};
        break;
      default:
        console.log('default hit');
        this.state = {initalTab: 1};
        console.log('this.state.initalTab', this.state.initalTab);
        break;
    }

  }

  render() {
    return (

      <Tabs className="nav" initialSelectedIndex={this.state.initalTab}>
        <Tab
          label="D2SF Screen Editor"
          style={styles.tab1}
          disabled={true}
        />
        <Tab
          icon={<ImageImage />}
          label="Image"
          onActive={() => {
            this.props.changeAppBarTitle('Image', 'image');
            this.context.router.history.push('/image');
          }}
        />
        <Tab
          icon={<ImageSlideShow />}
          label="Image Slide"
          onActive={() => {
            this.props.changeAppBarTitle('Image Slide', 'imageSlide');
            this.context.router.history.push("/imageSlide");
          }}
        />
        <Tab
          icon={<AvVideoCam />}
          label="Video"
          onActive={() => {
            this.props.changeAppBarTitle('Video', 'video');
            this.context.router.history.push("/video");
          }}
        />
        <Tab
          icon={<SettingsIcon />}
          label="Settings"
          onActive={() => {
            this.props.changeAppBarTitle('Settings', 'settings');
            this.context.router.history.push("/settings");
          }}
        />
      </Tabs>

    )
  }
}
