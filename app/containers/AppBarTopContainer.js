import { connect } from 'react-redux';
import AppBarTop from '../components/AppBarTop';

const mapStateToProps = (state) => {
  return {
    appBar: state.appBar,
    image: state.image,
    imageSlide: state.imageSlide,
    video: state.video,
    settings: state.settings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    test: () => {

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarTop);
