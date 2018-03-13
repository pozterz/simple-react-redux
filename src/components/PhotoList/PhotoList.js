import React, { Component } from 'react'
import Photo from './Photo'
import { connect } from 'react-redux'
import { Row } from 'reactstrap'
import * as GalleryActions from '../../redux/actions/gallery'
import { HashLoader } from 'react-spinners'
import './photo.css'

export class PhotoList extends Component {

  componentDidMount() {
    const { getPhotoList } = this.props
    getPhotoList()
  }
  
  render() {
    const { gallery } = this.props

    if(gallery.isFetching) return <div className="d-flex justify-content-center align-content-center"><HashLoader color="#F07E7E" size="60" /></div>

    return (
      <Row>
        {
          gallery.data.map( photo => 
            <Photo key={photo.id} photo={photo} />
          )
        }
      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  gallery: state.gallery
})

const mapDispatchToProps = {
  ...GalleryActions
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoList)
