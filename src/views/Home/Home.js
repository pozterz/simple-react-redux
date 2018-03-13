import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as viewActions from '../../redux/actions/views'
import { Container, Jumbotron, Button } from 'reactstrap';

class Home extends Component {

  componentDidMount = () => {
    const { enterView } = this.props
    enterView('Home')
  }
  
  componentWillUnmount = () => {
    const { leaveView } = this.props
    leaveView('Home')
  }
  
  render() {
    return (
      <Container>
        <Jumbotron>
          <h1 className="display-3">Hello, world!</h1>
          <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr className="my-2" />
          <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
          <p className="lead">
            <Button color="primary">Learn More</Button>
          </p>
        </Jumbotron>
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
