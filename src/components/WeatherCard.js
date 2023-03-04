import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {
    Moisture,
    Wind,
    Sunrise,
    Sunset,
} from 'react-bootstrap-icons';
import ErrorMessage from './errorMessage/ErrorMessage';
import Spinner from './Spinner';
import Skeleton from './Skeleton';
import styled from 'styled-components';

const ItemWithoutBorder = styled(ListGroup.Item)`
    border: none;
`;

const WeatherCard = ({ weather, error, loading }) => {
    const skeleton = weather || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !weather) ? (
        <View weather={weather} />
    ) : null;
    return (
        <>
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};
const View = ({ weather }) => {
    const { name } = weather.location;
    const { temp_c, humidity, wind_kph, condition } = weather.current;
    const { text, icon } = condition;
    const { sunrise, sunset } = weather.astro;
    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    // Calculate time until sunrise

    return (
        <Card>
            <Card.Header style={{ border: 'none', background: 'white' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <span className="fw-bolder text-secondary">{name}</span>
                    <span className="fw-bolder text-secondary">
                        {currentTime}
                    </span>
                </div>
            </Card.Header>
            <Card.Body className="d-flex flex-column pt-5 pb-3 align-items-center">
                <Card.Title className="fs-1 fw-light">{temp_c}°C</Card.Title>
                <Card.Subtitle className="text-secondary fw-light">
                    {text}
                </Card.Subtitle>
            </Card.Body>
            <ListGroup
                style={{ border: 'none' }}
                className="d-flex flex-row justify-content-between pb-3"
            >
                <div>
                    <ItemWithoutBorder className="text-secondary">
                        <Moisture
                            className="me-2 text-secondary"
                            width="20"
                            height="20"
                        />
                        {humidity}%
                    </ItemWithoutBorder>
                    <ItemWithoutBorder className="text-secondary">
                        <Wind
                            className="me-2 text-secondary"
                            width="20"
                            height="20"
                        />
                        {wind_kph} km/h
                    </ItemWithoutBorder>
                    <ItemWithoutBorder className="text-secondary">
                        <Sunrise
                            className="me-2 text-secondary"
                            width="20"
                            height="20"
                        />
                        {sunrise}
                    </ItemWithoutBorder>
                    <ItemWithoutBorder className="text-secondary">
                        <Sunset
                            className="me-2 text-secondary"
                            width="20"
                            height="20"
                        />
                        {sunset}
                    </ItemWithoutBorder>
                </div>
                <ItemWithoutBorder className="d-flex flex-column justify-content-center">
                    <img
                        src={icon}
                        alt="weather icon"
                        width="100"
                        height="100"
                    />
                    {/*<CloudDrizzleFill width="100" height="100" />*/}
                </ItemWithoutBorder>
            </ListGroup>
        </Card>
    );
};
export default WeatherCard;
