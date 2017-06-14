import React, { Component } from 'react';
import styles from './common.css';
import ContentAddBoxIcon from 'material-ui/svg-icons/content/add-box';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import ImageSlideBox from './ImageSlideBox';

export default class ImageSlideView extends Component {

	constructor() {
		super();

		this.getSubTitle = ::this.getSubTitle;
		this.addImageSlideBox = ::this.addImageSlideBox;
	}

  getSubTitle() {
    if(!this.props.settings.savedImageSlidePath) {
      return '저장 경로 설정후 등록하세요.';
    } else {
      return "세트를 추가하여 작성할 이미지 슬라이드 정보를 입력하세요.";
    }
  }

  addImageSlideBox(e) {
    this.props.addImageSlideBox();
  }

	render() {
		return (
      <div>
        <Card>
          <CardHeader
            title="이미지 슬라이드 세트구성"
            subtitle={this.getSubTitle()}
          />
          <CardActions>
            <RaisedButton
              label="세트 추가"
              labelPosition="before"
              primary={true}
              icon={<ContentAddBoxIcon />}
              className={styles.button}
              disabled={!this.props.settings.savedImageSlidePath}
              onTouchTap={this.addImageSlideBox} />
          </CardActions>
        </Card>
        {
          this.props.imageSlide.imageSlideBoxes.map((boxInfo, i) => {
            return (
              <ImageSlideBox mtitle={boxInfo.mtitle}
                             ltitle={boxInfo.ltitle}
                             stitle={boxInfo.stitle}
                             images={boxInfo.images}
                             savedImageSlidePath={this.props.settings.savedImageSlidePath}
                             key={i}
                             index={i}
                             handleDelete={this.props.deleteImageSlideBox}
                             handleUpdate={this.props.updateImageSlideBox}
              />
            )
          })
        }
      </div>
		)
	}

}
