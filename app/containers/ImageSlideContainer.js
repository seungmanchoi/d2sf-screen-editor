import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImageSlideView from '../components/ImageSlideView';
import {
  addImageSlideBox,
  updateImageSlideBox,
  deleteImageSlideBox,
} from '../actions/imageSlideAction';

const mapStateToProps = (state) => {
	return {
	  imageSlide: state.imageSlide,
    settings: state.settings
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    addImageSlideBox: (boxInfo) => {
      dispatch(addImageSlideBox({
        ltitle: '@ D2SF',
        mtitle: '네이버 테크 액셀러레이터 D2 Startup Factory에서 다양한 경험을 공유해주세요, 추첨을 통해 기념품을 드립니다',
        stitle: 'www.facebook.com/d2startup',
        images: []
      }));
    },
    updateImageSlideBox: (boxInfo) => {
      dispatch(updateImageSlideBox(boxInfo));
    },
    deleteImageSlideBox: (key) => {
      dispatch(deleteImageSlideBox(key));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageSlideView);
