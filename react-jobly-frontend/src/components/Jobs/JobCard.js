import React, { useContext, useEffect, useState } from "react";
import '../../styles/JobCard.css'
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
}
 from 'reactstrap'
import UserContext from "../../context/UserContext";

const JobCard = ({ id, title, salary, companyName, companyHandle, apply }) => {
    const user = useContext(UserContext);
    const [applied, setApplied] = useState(false)

    const handleClick = () => {
        apply(id);
        setApplied(true)
    }
    
    useEffect(() => {
        const checkApplied = () => {
            // eslint-disable-next-line
            user.applications.map(appId => {
                if(appId === id){
                    setApplied(true);
                }
            })
        }
        checkApplied()
    }, [])


    return (
        <div className="JobCard">
            <Card>
                <CardBody>
                <CardTitle tag="h5">
                    {title}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    
                </CardSubtitle>
                </CardBody>
                <img
                    alt=""
                    src="https://unsplash.com/photos/BlIhVfXbi9s"
                    width="100%"
                />
                <CardBody>
                    <CardText>
                        Salary: {salary ? `$${salary}` : "N/A"}
                    </CardText>
                        <Button onClick={handleClick} color="danger" disabled={applied}>
                            {applied ? "Applied" : "Apply"}
                        </Button>
                </CardBody>
                </Card>
        </div>
    )
};

export default JobCard;