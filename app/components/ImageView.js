import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

import SearchIcon from 'material-ui/svg-icons/action/search';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import styles from './common.css';

export default class ImageView extends Component {

	constructor() {
		super();

		this.changeImage = ::this.changeImage;
		this.getSubTitle = ::this.getSubTitle;
	}

  changeImage(e) {
    let imagePath = e.target.files[0].path;

	  this.props.setImage(imagePath);
  }

  getSubTitle() {
	  if(!this.props.settings.savedImagePath) {
      return '저장 경로 설정후 등록하세요.';
    } else {
	    return "화면에 노출할 이미지를 선택해 주세요.";
    }
  }

	render() {
		return (
      <div>
        <Card>
          <CardHeader
            title="이미지 선택"
            subtitle={this.getSubTitle()}
          />
          <CardActions>
            <RaisedButton
              label="이미지 선택"
              labelPosition="before"
              primary={true}
              icon={<SearchIcon />}
              className={styles.button}
              disabled={!this.props.settings.savedImagePath}
            >
              <input type="file" className={styles.imageInput} accept="image/*" disabled={!this.props.settings.savedImagePath} onChange={this.changeImage}/>
            </RaisedButton>
          </CardActions>
        </Card>

        {
          (() => {
            let path = this.props.image.path;

            if(path) {
              return (
                <GridList
                  cols={2}
                  cellHeight={200}
                  padding={1}
                >
                  <GridTile
                    key={path}
                    title={`선택 이미지 (${this.props.image.path})`}
                    actionPosition="left"
                    titlePosition="top"
                    titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                    cols={2}
                    rows={2}
                  >
                    <img src={path} />
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
