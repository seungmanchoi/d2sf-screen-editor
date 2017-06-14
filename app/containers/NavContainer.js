import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Nav from '../components/Nav';
import {changeAppBarTitle} from '../actions/navAction';

const mapStateToProps = (state) => {
  return {
    appBar: state.appBar
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeAppBarTitle: (title, type) => {
      console.log(title, type);
      dispatch(changeAppBarTitle(title, type));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
