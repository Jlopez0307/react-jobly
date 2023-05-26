import React from "react";
import { Link } from "react-router-dom";
import '../../styles/CompanyCard.css'
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardLink
}
 from 'reactstrap'

const CompanyCard = ({ description, handle, logoUrl, name, numEmployees }) => {
    return (
        <div className="CompanyCard">
            <Card>
                <CardBody>
                <CardTitle tag="h5">
                    {name}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    
                </CardSubtitle>
                </CardBody>
                <img
                    alt=""
                    src={logoUrl}
                />
                <CardBody>
                    <CardText>
                        Some quick example text to build on the card title and make up the bulk of the card‘s content.
                    </CardText>
                    {/* <CardLink href="#">
                        Card Link
                    </CardLink>
                    <CardLink href="#">
                        Another Link
                    </CardLink> */}
                </CardBody>
                </Card>
        </div>
    )
};

export default CompanyCard;