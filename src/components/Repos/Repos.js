import React, { Component, Fragment } from 'react'
import Repo from './Repo'
import { connect } from 'react-redux'
import * as GithubActions from '../../redux/actions/github'

export class Repos extends Component {

  componentDidMount() {
    const { getRepos } = this.props
    getRepos()
  }
  
  render() {
    const { repos } = this.props
    return (
      <Fragment>
        {
          !repos.isFetching ? repos.data.map( repo => <Repo key={repo.id} repo={repo} />) : 'Loading....'
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  repos: state.repos
})

const mapDispatchToProps = {
  ...GithubActions
}

export default connect(mapStateToProps, mapDispatchToProps)(Repos)
