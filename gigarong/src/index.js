import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter} from 'react-router-dom';
// import {HashRouter} from 'react-router-dom';

import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux'


/**
*  Redux쓰는 이유
* 1. 복잡한 props 전송이 필요없음
*    모든 컴포넌트가 직접 데이터 꺼내쓸 수 있음
* 2. state 데이터 관리가능 (수정방법을 미리 정의)

    * 여러화면에서 쓸때만 필요
      개별이거나 데이터양이 적을땐 배보다 배꼽이 큰 상황.
*/

/**
 * Redux쓰는 방법
 * 1. <Provider>로 원하는 곳 감싸기
 * 2. createStore에 담아서 넘기기
 * 3.
 */

let tempData = [ 
  { id: 'black', name: '테스트', quan: 2},
  { id: 'white', name: '테스트', quan: 6},
  { id: 'green', name: '테스트', quan: 1},
  { id: 'blue', name: '테스트', quan: 9},
  { id: 'yellow', name: '테스트', quan: 122},
  { id: 'pink', name: '테스트', quan: 53}
];                                                                                                              

// state = 초기값
// 데이터수정방법
function reducer(state = tempData, action ) {
  console.log('action',action)

  if (action.type === 'detailAdd') { // Detail.js 항목추가
    
    let copy = [...state]
    let flag = false

    copy.forEach((item) => {
      if (item.id === action.payload.id) {
        item.quan++
        flag = true
      }
    })

    if (!flag) {
      copy.push(action.payload) // 추가 할 데이터
    }
    return copy
  } else if (action.type === 'quanAdd') { // Cart.js
    let copyData = [...state]
    copyData[action.idx].quan++
    return copyData
  } else if (action.type === 'quanMin') { // Cart.js
    let copyData = [...state]
    copyData[action.idx].quan--
    return copyData
  } else {
    return state
  }
}

// reducer를 여러개 쓰고 싶다면
// let store = createStore(combineReducers({reducer, reducer2,reducer3}));
let store = createStore(reducer);


ReactDOM.render(
  // 자꾸  findDOMNode 에러 떠서 잠시 주석
  // <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
