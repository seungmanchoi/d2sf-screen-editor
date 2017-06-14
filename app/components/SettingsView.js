import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import {blue500, yellow600, pink600} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './common.css';

import AvVideoCam from 'material-ui/svg-icons/av/videocam';
import ImageImage from 'material-ui/svg-icons/image/image';
import ImageSlideShow from 'material-ui/svg-icons/image/slideshow';
import Snackbar from 'material-ui/Snackbar';

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import {ipcRenderer} from 'electron';


export default class SettingsView extends Component {

  constructor() {
    super();

    this.getImagePathInput = ::this.getImagePathInput;
    this.getImageSlidePathInput = ::this.getImageSlidePathInput;
    this.getVideoPathInput = ::this.getVideoPathInput;
    this.changeImageDirectoryPath = ::this.changeImageDirectoryPath;
    this.changeImageSlideDirectoryPath = ::this.changeImageSlideDirectoryPath;
    this.changeVideoDirectoryPath = ::this.changeVideoDirectoryPath;
    this.saveSettinigs = ::this.saveSettinigs;
    this.handleToastClose = ::this.handleToastClose;

    this.state = {
      toastOpen: false,
      toastMessage: ''
    };
  }

  componentDidMount() {
    this.refs.imagePathInput.directory = true;
    this.refs.imagePathInput.webkitdirectory = true;
    this.refs.imageSlidePathInput.directory = true;
    this.refs.imageSlidePathInput.webkitdirectory = true;
    this.refs.videoPathInput.directory = true;
    this.refs.videoPathInput.webkitdirectory = true;
  }

  getImagePathInput() {
    let path = this.props.settings.imagePath;
    let text = '';

    if(path) {
      text = path;
    } else {
      text = '경로설정이 없습니다.';
    }

    return text;
  }

  getImageSlidePathInput() {
    let path = this.props.settings.imageSlidePath;
    let text = '';

    if(path) {
      text = path;
    } else {
      text = '경로설정이 없습니다.';
    }

    return text;
  }

  getVideoPathInput() {
    let path = this.props.settings.videoPath;
    let text = '';

    if(path) {
      text = path;
    } else {
      text = '경로설정이 없습니다.';
    }

    return text;
  }

  changeImageDirectoryPath(e) {
    let directoryPath = e.target.files[0].path;

    this.props.setDirectory('image', directoryPath);
  }

  changeImageSlideDirectoryPath(e) {
    let directoryPath = e.target.files[0].path;

    this.props.setDirectory('imageSlide', directoryPath);
  }

  changeVideoDirectoryPath(e) {
    let directoryPath = e.target.files[0].path;

    this.props.setDirectory('video', directoryPath);
  }

  saveSettinigs() {
    let imagePath = this.props.settings.imagePath;
    let imageSlidePath = this.props.settings.imageSlidePath;
    let videoPath = this.props.settings.videoPath;

    let result = ipcRenderer.sendSync('save-settings', {
      imagePath,
      imageSlidePath,
      videoPath
    });

    if(!result.error) {
      this.setState({
        toastOpen: true,
        toastMessage: '저장되었습니다.'
      });
      this.props.setSavedSettings(result.data);
    } else {
      this.setState({
        toastOpen: true,
        toastMessage: '오류가 발생하였습니다. 다시 시도해 주세요.' + JSON.stringify(result.data)
      });
    }
  }

  handleToastClose() {
    this.setState({
      toastOpen: false
    })
  }

  render() {
    return (
      <div>
        <List>
          <ListItem
            leftAvatar={<Avatar icon={<ImageImage />} backgroundColor={blue500} />}
            rightIcon={(
              <RaisedButton
                label="경로지정"
                labelPosition="before"
                primary={true}
                className={styles.button2}
              >
                <input type="file" ref="imagePathInput" onChange={this.changeImageDirectoryPath} className={styles.imageInput} multiple />
              </RaisedButton>
            )}
            primaryText={this.getImagePathInput()}
          />
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar icon={<ImageSlideShow />} backgroundColor={yellow600} />}
            rightIcon={(
              <RaisedButton
                label="경로지정"
                labelPosition="before"
                primary={true}
                className={styles.button2}
              >
                <input type="file" ref="imageSlidePathInput" onChange={this.changeImageSlideDirectoryPath} className={styles.imageInput} multiple />
              </RaisedButton>
            )}
            primaryText={this.getImageSlidePathInput()}
          />
          <Divider inset={true} />
          <ListItem
            leftAvatar={<Avatar icon={<AvVideoCam />} backgroundColor={pink600} />}
            rightIcon={(
              <RaisedButton
                label="경로지정"
                labelPosition="before"
                primary={true}
                className={styles.button2}
              >
                <input type="file" ref="videoPathInput" onChange={this.changeVideoDirectoryPath} className={styles.imageInput} multiple />
              </RaisedButton>
            )}
            primaryText={this.getVideoPathInput()}
          />
        </List>

        <Toolbar>
          <ToolbarGroup>
            <RaisedButton className={styles.buttonSave}  label="저장" primary={true} onTouchTap={this.saveSettinigs}/>
          </ToolbarGroup>
        </Toolbar>

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
