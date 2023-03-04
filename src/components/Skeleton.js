import Card from 'react-bootstrap/Card';
import React from 'react';

const Skeleton = () => {
    return (
        <Card>
            <Card.Body className="d-flex flex-column pt-5 pb-3 align-items-center">
                <Card.Title className="fs-2 fw-light">
                    Please enter city in English
                </Card.Title>
            </Card.Body>
        </Card>
    );
};

export default Skeleton;
