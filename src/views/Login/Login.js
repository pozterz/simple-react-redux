import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Card, Button,CardBody, Form, FormGroup, Input, InputGroup}     from 'reactstrap'
import auth           from '../../services/auth';
import { appConfig } from '../../config'
import * as viewActions from '../../redux/actions/views'
import * as userAuthActions from '../../redux/actions/userAuth'
import './login.css'

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email:          '',
      password:       '',
      isLoginError: false,
      error: {
        message: ''
      }
    }
  }

  componentDidMount = () => {
    const { disconnectUser } = this.props
    disconnectUser()
  }
  
  handlesOnEmailChange = e => {
    if(e){
      e.preventDefault();
      this.setState({ email: e.target.value.trim() });
    }
  }

  handlesOnPasswordChange = e => {
    if(e){
      e.preventDefault();
      this.setState({ password: e.target.value.trim() });
    }
  }

  handlesOnLogin = async(e) => {
    if (e) {
      e.preventDefault();
    }

    const { history, logUserIfNeeded } = this.props;
    const { email, password } = this.state;
    const userLogin = { email, password }
    if(email !== '' && password !== ''){
      try {
        const response = await logUserIfNeeded(userLogin);
        const {
          data: {
            result: {
              token
            }
          }
        } = response.payload;
        
        auth.setToken(token);
        auth.setUserInfo({email});
        
        history.push({ pathname: '/' }); // redirect after login
      } catch (error) {
        this.setState({
          isLoginError: true,
          email: '',
          password: '',
          error: {
            message: error.message
          }
        })
      }
    }
  }

  render() {
    const { email, password, isLoginError, error } = this.state;

    const { isLogging } = this.props;

    return (
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-center mvh">
          <Card className="text-center mw-50">
            <CardBody>
              <div className="card-block">
                <h2 className="my-4 appname">{appConfig.appName}</h2>
                { isLogging ? 'Loading...' : null }
                { isLoginError ? <div className="alert alert-dark">{ error.message }</div>: '' }
                <div className="form">
                  <Form>
                    <FormGroup className="my-5">
                      <InputGroup>
                        <Input type="email" className="input" placeholder="E-mail" value={email} onChange={this.handlesOnEmailChange} />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="my-5">
                      <InputGroup>
                        <Input type="password" className="input" placeholder="Password" value={password} onChange={this.handlesOnPasswordChange} />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="mt-5 mb-0">
                      <Button color="secondary" type="submit" block className="py-3" onClick={this.handlesOnLogin}>Login</Button>
                      <p className="mt-4 mb-0 text-muted">Forgot password ?</p>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.userAuth.isAuthenticated,
  isFetching:      state.userAuth.isFetching,
  isLogging:       state.userAuth.isLogging
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      ...userAuthActions,
      ...viewActions
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
