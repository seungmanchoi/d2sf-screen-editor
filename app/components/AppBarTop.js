import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import AvVideoCam from 'material-ui/svg-icons/av/videocam';
import ImageImage from 'material-ui/svg-icons/image/image';
import ImageSlideShow from 'material-ui/svg-icons/image/slideshow';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import Snackbar from 'material-ui/Snackbar';
import {ipcRenderer} from 'electron';

export default class AppBarTop extends Component {

  constructor() {
    super();

    this.getTitle = ::this.getTitle;
    this.getIcon = ::this.getIcon;
    this.saveSettings = ::this.saveSettings;
    this.getSaveElement = ::this.getSaveElement;
    this.handleToastClose = ::this.handleToastClose;
    this.validate = ::this.validate;

    this.state = {
      toastOpen: false,
      toastMessage: ''
    };
  }

  getTitle(title) {
    return {
      'Image': '이미지',
      'Image Slide': '이미지 슬라이드',
      'Video': '동영상',
      'Settings': '설정'
    }[title];
  }

  getIcon(title) {
    switch(title) {
      case 'Image':
        return (
          <IconButton><ImageImage/></IconButton>
        )
        break;
      case 'Image Slide':
        return (
          <IconButton><ImageSlideShow/></IconButton>
        )
        break;
      case 'Video':
        return (
          <IconButton><AvVideoCam/></IconButton>
        )
        break;
      case 'Settings':
        return (
          <IconButton><SettingsIcon/></IconButton>
        )
        break;
    }
  }

  getSaveElement() {
    if(this.props.appBar.title !== 'Settings') {
      return (
        <FlatButton label="Save" onTouchTap={this.saveSettings} />
      )
    }
  }

  saveSettings() {
    var validationResultMap = this.validate();

    if(validationResultMap.isValid) {
      var result = ipcRenderer.sendSync('make-xml', {
        type: this.props.appBar.type,
        data: validationResultMap.data,
        savedPath: validationResultMap.savedPath
      });

      if(result === 'make') {
        this.setState((state) => {
          state.toastMessage = '저장되었습니다.';
          state.toastOpen = true;
        });
      } else {
        this.setState((state) => {
          state.toastMessage = result;
          state.toastOpen = true;
        })
      }

    } else {
      this.setState((state) => {
        state.toastMessage = validationResultMap.message;
        state.toastOpen = true;
      })
    }
  }

  validate() {
    let retObj = {
      isValid: true,
      message: '',
      data: ''
    };

    switch(this.props.appBar.type) {
      case 'image':
        if(!this.props.image.path) {
          retObj.isValid = false;
          retObj.message = '스크린에 노출할 이미지를 선택하세요.';
        } else {
          retObj.data = this.props.image;
          retObj.savedPath = this.props.settings.savedImagePath;
        }
        break;
      case 'imageSlide':
        if(!this.props.imageSlide.imageSlideBoxes.length) {
          retObj.isValid = false;
          retObj.message = '스크린에 노출할 이미지를 선택하세요.';
        } else {
          retObj.data = this.props.imageSlide.imageSlideBoxes;
          retObj.savedPath = this.props.settings.savedImageSlidePath;
        }
        break;
      case 'video':
        if(!this.props.video.path) {
          retObj.isValid = false;
          retObj.message = '스크린에 노출할 동영상을 선택하세요.';
        } else {
          retObj.data = this.props.video;
          retObj.savedPath = this.props.settings.savedVideoPath;
        }
        break;
    }

    return retObj;
  }

  handleToastClose() {
    this.setState({
      toastOpen: false
    })
  }

  render() {
    return (
      <div>
        <AppBar
          title={<span>{this.props.appBar.title}</span>}
          iconElementLeft={this.getIcon(this.props.appBar.title)}
          iconElementRight={this.getSaveElement()}/>
        <Snackbar
          open={this.state.toastOpen}
          message={this.state.toastMessage}
          autoHideDuration={3000}
          onRequestClose={this.handleToastClose}
          bodyStyle={{ backgroundColor: 'teal', color: 'coral', marginBottom: '123px' }}
        />
      </div>
    )
  }

}
