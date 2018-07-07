import { connect } from 'react-redux'
import { bindActionCreators, compose } from 'redux'
import App from './App'
import { withRouter } from 'react-router'
import { checkIfAuthenticated } from '../../redux/actions/userAuth'
import { swal } from 'react-redux-sweetalert'

const mapStateToProps = state => {
	return {
		currentView: state.views.currentView,
		user: state.userAuth.user,
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			checkIfAuthenticated,
			swal
		},
		dispatch
	)
}

export default compose(
	withRouter,
	connect(
		mapStateToProps,
		mapDispatchToProps
	)
)(App)
