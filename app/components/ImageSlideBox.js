import React, { Component } from 'react';
import styles from './common.css';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import DeleteIcon from 'material-ui/svg-icons/action/delete-forever';
import RaisedButton from 'material-ui/RaisedButton';
import {GridList, GridTile} from 'material-ui/GridList';

const gridStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: '10px 0'
  },
  gridList: {
    overflowY: 'auto',
  },
  textField: {
    paddingLeft: '3%',
    paddingRight: '3%',
    width: '85%'
  }
};

export default class ImageSlideBox extends Component {

  constructor(props) {
    super(props);

    this.handleDelete = ::this.handleDelete;
    this.setImages = ::this.setImages;
    this.handleUpdate = ::this.handleUpdate;
    this.handleTextField = ::this.handleTextField;
  }

  handleDelete(e) {
    this.props.handleDelete(this.props.index);
  }

  setImages(e) {
    var files = e.target.files;
    var images = [];

    for(var i = 0, max = files.length; i < max; i += 1) {
      images.push(files[i].path);
    }

    this.props.handleUpdate({
      ltitle: this.props.ltitle,
      mtitle: this.props.mtitle,
      stitle: this.props.stitle,
      boxKey: this.props.index,
      images: images
    });
  }

  handleTextField(prop, e) {
    console.log(e.target.value);

    this.handleUpdate(prop, e.target.value);
  }

  handleUpdate(prop, value) {
    var boxInfo = {
      ltitle: this.props.ltitle,
      mtitle: this.props.mtitle,
      stitle: this.props.stitle,
      images: this.props.images,
      boxKey: this.props.index
    };

    boxInfo[prop] = value;

    this.props.handleUpdate(boxInfo);
  }

  render() {
    return (
      <div>
        <div style={{border: '1px solid silver', margin: '10px'}}>
          <TextField
            floatingLabelText="L Title"
            value={this.props.ltitle}
            style={gridStyles.textField}
            onChange={this.handleTextField.bind(this, 'ltitle')}
          />
          <TextField
            floatingLabelText="M Title"
            value={this.props.mtitle}
            style={gridStyles.textField}
            onChange={this.handleTextField.bind(this, 'mtitle')}
          />
          <TextField
            floatingLabelText="S Title"
            value={this.props.stitle}
            style={gridStyles.textField}
            onChange={this.handleTextField.bind(this, 'stitle')}
          />
          <div style={{textAlign: 'right'}}>
            <RaisedButton
              label="이미지 선택"
              labelPosition="before"
              primary={true}
              icon={<SearchIcon />}
              className={styles.button}
              disabled={!this.props.savedImageSlidePath}
            >
              <input type="file" className={styles.imageInput} disabled={!this.props.savedImageSlidePath} accept="image/*" onChange={this.setImages} multiple />
            </RaisedButton>
            <RaisedButton
              label="삭제"
              labelPosition="before"
              secondary={true}
              icon={<DeleteIcon />}
              className={styles.button}
              disabled={!this.props.savedImageSlidePath}
              onTouchTap={this.handleDelete}
            />
          </div>
          {
            (() => {
              if(this.props.images.length > 0) {
                return (
                  <div style={gridStyles.root}>
                    <GridList
                      cellHeight={180}
                      style={gridStyles.gridList}
                      cols={2}
                      padding={1}
                    >
                      {
                        this.props.images.map((path, i) => {
                          let fileName = path.replace(/^.*[\\\/]/, '');

                          return (
                            <GridTile
                              key={i}
                              title={fileName}
                              actionPosition="left"
                              titlePosition="top"
                              titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                              cols={1}
                              rows={1}
                            >
                              <img src={path} />
                            </GridTile>
                          );

                        })
                      }
                    </GridList>
                  </div>
                )
              }
            })()
          }
        </div>
      </div>
    );
  }
}
