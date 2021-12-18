import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';
// import {HashRouter} from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux'


/**
*  Redux쓰는 이유
* 1. 복잡한 props 전송이 필요없음
*    모든 컴포넌트가 직접 데이터 꺼내쓸 수 있음
* 2. state 데이터 관리가능 (수정방법을 미리 정의)
*/

/**
 * Redux쓰는 방법
 * 1. <Provider>로 원하는 곳 감싸기
 * 2. createStore에 담아서 넘기기
 */

let tempData = [ 
  { id: 'balck', name: '테스트', quan: 2},
  { id: 'white', name: '테스트', quan: 6},
  { id: 'green', name: '테스트', quan: 1},
  { id: 'blue', name: '테스트', quan: 9},
  { id: 'yellow', name: '테스트', quan: 122},
  { id: 'pink', name: '테스트', quan: 53}
];

let store = createStore(reducer);

// state = 초기값
function reducer(state = tempData, action ) {
  console.log('action',action)
  if (action.type === 'quanAdd') {
    let copyData = [...state]
    copyData[action.idx].quan++
    return copyData
  } else if (action.type === 'quanMin') {
    let copyData = [...state]
    copyData[action.idx].quan--
    return copyData
  } else {
    return state
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
