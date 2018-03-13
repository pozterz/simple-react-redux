import React, { Component }   from 'react';
import {
  NavBar,
}                             from '../../components';
import MainRoutes             from '../../routes/MainRoutes';
import { appConfig } from '../../config'

class App extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  
  render() {
    const { currentView } = this.props
    
    return (
      <div id="appContainer">
        <NavBar brand={appConfig.appName} toggle={this.toggle.bind(this)} isOpen={this.state.isOpen} currentView={currentView} />
        <div id="content" className="container-fluid">
          <MainRoutes />
        </div>
      </div>
    );
  }
 
}

export default App;
