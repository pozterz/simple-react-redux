import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as viewActions from '../../redux/actions/views'
import PhotoList from '../../components/PhotoList/PhotoList'

class Gallery extends Component {

  componentDidMount = () => {
    const { enterView } = this.props
    enterView('Gallery')
  }
  
  componentWillUnmount = () => {
    const { leaveView } = this.props
    leaveView('Gallery')
  }

  render() {
    return (
      <div>
        <PhotoList />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      enterView: viewActions.enterView,
      leaveView: viewActions.leaveView,
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery)
