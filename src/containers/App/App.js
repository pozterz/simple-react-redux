import React, { Component } from 'react'
import { NavBar } from '../../components'
import MainRoutes from '../../routes/MainRoutes'
import { appConfig } from '../../config'

class App extends Component {
	constructor(props) {
		super(props)
		const { checkIfAuthenticated } = this.props
		checkIfAuthenticated()

		this.state = {
			isOpen: false
		}
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	logout(e) {
		this.props.swal({
			title: 'ยืนยันการออกจากระบบ',
			type: 'info',
			showCancelButton: true,
			confirmButtonText: 'ยืนยัน',
			cancelButtonText: 'ยกเลิก',
			closeOnConfirm: true,
			onConfirm: this.confirmLogout
		})
	}

	confirmLogout = () => {
		const { history } = this.props
		history.push({ pathname: '/login' })
	}

	cancelLogout() {}

	render() {
		const { currentView, user } = this.props
		console.log('User', user)
		return (
			<div>
				<NavBar
					brand={appConfig.appName}
					toggle={this.toggle.bind(this)}
					isOpen={this.state.isOpen}
					currentView={currentView}
					logoutAlert={this.logout.bind(this)}
					user={user}
				/>
				<div className="container">
					<MainRoutes />
				</div>
			</div>
		)
	}
}

export default App
