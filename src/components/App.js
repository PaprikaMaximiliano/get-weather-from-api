import { Container, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import useHttp from '../hooks/https.hook';
import WeatherCard from './WeatherCard';
import SearchInput from './SearchInput';

function App() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState(null);
    const [loading, request, error, clearError] = useHttp();

    useEffect(() => {
        async function fetchData() {
            if (city) {
                    clearError();
                    const currentWeather = await request(
                        `https://api.weatherapi.com/v1/current.json?key=1121c18205fe414baf7194528230203&q=${city}&aqi=no`
                    );

                    const currentAstronomy = await request(
                        `https://api.weatherapi.com/v1/astronomy.json?key=1121c18205fe414baf7194528230203&q=${city}&dt=2023-03-04`
                    );

                    setWeather({
                        ...currentWeather,
                        ...currentAstronomy.astronomy,
                    });
            }
        }
        fetchData();
    }, [city]);

    return (
        <div className="App">
            <Container>
                <Row className="justify-content-center mb-5">
                    <Col lg="6" md="7" xs="10">
                        <SearchInput onInput={setCity} />
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col lg="4" md="6" xs="9">
                        <WeatherCard
                            weather={weather}
                            error={error}
                            loading={loading}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
