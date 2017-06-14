import React, { Component } from 'react';
import styles from './common.css';
import SearchIcon from 'material-ui/svg-icons/action/search';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';

export default class VideoView extends Component {

	constructor() {
		super();

		this.changeVideo = ::this.changeVideo;
    this.getSubTitle = ::this.getSubTitle;
	}

  changeVideo(e) {
    let videoPath = e.target.files[0].path;

    this.props.setVideo(videoPath);
  }

  getSubTitle() {
    if(!this.props.settings.savedVideoPath) {
      return '저장 경로 설정후 등록하세요.';
    } else {
      return "화면에 노출할 동영상을 선택해 주세요.";
    }
  }

	render() {
		return (
		  <div>
        <Card>
          <CardHeader
            title="동영상 선택"
            subtitle={this.getSubTitle()}
          />
          <CardActions>
            <RaisedButton
              label="동영상 선택"
              labelPosition="before"
              primary={true}
              icon={<SearchIcon />}
              className={styles.button}
              disabled={!this.props.settings.savedVideoPath}
            >
              <input type="file" className={styles.imageInput} disabled={!this.props.settings.savedVideoPath} accept="video/mp4,video/x-m4v,video/*" onChange={this.changeVideo} />
            </RaisedButton>
          </CardActions>
        </Card>

        {
          (() => {
            let path = this.props.video.path;

            if(path) {
              return (
                <GridList
                  cols={2}
                  cellHeight={200}
                  padding={1}
                  className={styles.gridList}
                >
                  <GridTile
                    key={path}
                    title={`선택 동영상 (${path})`}
                    actionPosition="left"
                    titlePosition="top"
                    titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    cols={2}
                    rows={2}
                  >
                    <video style={{'width': '100%'}} controls>
                      <source src={path} />
                    </video>
                  </GridTile>
                </GridList>
              )
            }
          })()
        }
      </div>
		)
	}

}
