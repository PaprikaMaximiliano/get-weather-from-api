import React from 'react';
import { Form } from 'react-bootstrap';
import debounce from 'lodash.debounce';
function SearchInput({ onInput }) {
    const onChange = (e) => {
        e.preventDefault();
        onInput(e.target.value);
    };

    return (
        <Form
            className="mt-3"
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                }
            }}
        >
            <Form.Group
                controlId="formBasicText"
                onChange={(e) => e.preventDefault()}
            >
                <Form.Control
                    type="text"
                    placeholder="Enter city to get current weather"
                    onChange={debounce(onChange, 1000)}
                />
            </Form.Group>
        </Form>
    );
}

export default SearchInput;
