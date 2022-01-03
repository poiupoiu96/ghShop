import React, { useContext, useEffect, useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';




function Login () {
    console.log('login~~~')

    return (
        (
            <div className={loginInput}>
                <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Small</InputGroup.Text>
                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                </InputGroup>
            </div>
        )
    )
}

export default Login