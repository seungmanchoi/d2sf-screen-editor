import { connect } from 'react-redux';
import ImageView from '../components/ImageView';
import {setImage} from '../actions/imageAction';

const mapStateToProps = (state) => {
	return {
	  image: state.image,
    settings: state.settings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setImage: (path) => {
      dispatch(setImage(path));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageView);
