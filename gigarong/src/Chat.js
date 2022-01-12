// 1:1

import React from 'react';
import { FloatingButton, Item } from 'react-floating-button'
import butter from './butter.svg';

function chat () {
    return (
        <div>
            <p> Floating Button </p>
            <FloatingButton>
                <Item
                    imgSrc={butter}
                    onClick={() => {
                    console.log("callback function here");
                    }}
                />
                <Item
                    imgSrc={butter}
                    onClick={() => {
                    console.log("callback function here");
                    }}
                />
            </FloatingButton>
        </div>
    )
}


export default chat 