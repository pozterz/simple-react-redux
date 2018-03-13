import React from 'react'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
} from 'reactstrap';

const Photo = ({
  photo
}) => {
  return (
    <div className="col-md-3 col-6 my-2">
      <Card className="h-100" outline color="danger">
        <CardImg top width="100%" src={photo.thumbnailUrl} alt="Card image cap" />
        <CardBody>
          <CardText>{photo.title}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

export default Photo
