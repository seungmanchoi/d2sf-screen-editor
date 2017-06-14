import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VideoView from '../components/VideoView';
import { setVideo } from '../actions/videoAction';

const mapStateToProps = (state) => {
	return {
	  video: state.video,
    settings: state.settings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setVideo: (path) => {
      dispatch(setVideo(path));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoView);
