import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SettingsView from '../components/SettingsView';
import {
        setDirectory,
        SET_XML_IMAGE_PATH, SET_XML_IMAGE_SLIDE_PATH, SET_XML_VIDEO_PATH,
        SET_SAVED_SETTINGS
} from '../actions/settingsAction';

const mapStateToProps = (state) => {
  return {
    settings: state.settings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDirectory: (actionType, path) => {
      let type = '';

      switch(actionType) {
        case 'image':
          type = SET_XML_IMAGE_PATH;
          break;

        case 'imageSlide':
          type = SET_XML_IMAGE_SLIDE_PATH;
          break;

        case 'video':
          type = SET_XML_VIDEO_PATH;
          break;
      }

      dispatch(setDirectory({type, path}));
    },
    setSavedSettings: (pathData) => {
      dispatch({
        type: SET_SAVED_SETTINGS,
        pathData
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
