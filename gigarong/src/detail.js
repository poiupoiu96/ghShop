import React, {useEffect, useState, useContext} from 'react';
import { useHistory , useParams} from 'react-router';
import Styled from 'styled-components';
// import './detail.scss';
import {productContext} from './App.js'
import { Nav } from 'react-bootstrap';
import {CSSTransition} from "react-transition-group";
import  './detail.css'
import { connect } from 'react-redux';

/*****************************
 *  CSS 방법 2개
 *  npm install ~~ 할 때 잘 안깔리는 것들은 버전확인...
 ****************************/

/************************************
// 1. npm install styled-components
*************************************/
let Box = Styled.div`
padding: 20px;
`;
let BoxDetail = Styled.h4`
  font-size : 20px;
  color: ${props => props.setColor}
`;

/************************************
// 2. npm install node-sass
*************************************/
// 안깔림.. 
// TODO 주말에 다시시도


function Detail(param){
  
  let [compoDisabled, compoDisabledUpdate] = useState(true) 
  console.log('params', param)
  let test111 = useContext(productContext)
  console.log('test111',test111)

  let [tabNum, tabNumUpdate] = useState(0)
  let [switchAni, switchAniUpdate] = useState(false)
  /********************************************
   *  useEffect는 몇개씩 선언 가능
   *  mount, udate시
   *  unmount 시
   *  , [] => 조건 입력시 해당 변경시만
  ********************************************/
  // 컴포넌트가 mount, update 되었을 때
  useEffect( ()=>{
    console.log('언제 실행??')
    let timer = setTimeout(()=>{
      console.log('2초뒤 실행')
      compoDisabledUpdate(false)
    }, 2000)
    console.log('이건 한번만 떠야함;;')
    return clearTimeout(timer)
  }, [compoDisabled]);

  // 사라질 때 실행됨 unMount
  // useEffect(()=>{
  //   return ()=>{}
  // })

  console.log('2222222')
  let history = useHistory();

  // useParams() 안에는 { 사용자가 입력한  URL 파라미터들 }
  let { id } = useParams();

  // 방법1 (반복문)
  // let temp = {}
  // param.shoes.forEach( (item, idx) => {
  //     if ( item.id == id ) {
  //         temp = item
  //     }
  // });

  // 방법2 (find)
  let temp = param.shoes.find( item => item.id == id);
  console.log('temp',temp)

  function test() {
    alert('11')
  }
  console.log('333333333')
  
  return  (
    <div className="container" >
       {/* {compoDisabled &&
          <Box>
            <BoxDetail setColor="green">제목입니다.</BoxDetail>
          </Box>
      } */}

      { compoDisabled === true ?  
          <Box>
            <BoxDetail setColor="green">css테스트.</BoxDetail>
          </Box> : null 
      }

      {/* TAB */}
      <Nav variant="tabs" defaultActiveKey="link-0">
        <Nav.Item>
          <Nav.Link eventKey="link-0" onClick={ ()=>{ switchAniUpdate(false); tabNumUpdate(0)}}>Active</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" onClick={ ()=>{ switchAniUpdate(false); tabNumUpdate(1)}}>Option 2</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Disabled
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {/* in={} true일 경우만 실행 */}
      <CSSTransition in={switchAni} className="wow" timeout={500}>
        <TabContent tabNum={tabNum} switchAniUpdate={switchAniUpdate}/>
      </CSSTransition>

      <div className="row">
        <div className="col-md-6">
          <img src={temp.src} width="100%" />
        </div>
        <div className="col-md-6 mt-4">
          <h4 className="pt-5">{temp.title}</h4>
          <p>{temp.content}</p>
          <p>{temp.price}</p>
          <STOCKDIVINFO param={param.stock}></STOCKDIVINFO>
          <br/>
          <button className="btn btn-danger" onClick={ ()=> { 
            param.stockUpdate([9,9,9]);
            param.dispatch({type: 'detailAdd', payload: { id: 'yellow', name: temp.content, quan: 1}  });
            history.push('/cart');
          }}>주문하기</button>&nbsp;
          <button className="btn btn-primary" onClick={ ()=> {
              // history.goBack() // 뒤로가기
              history.push('/') // 경로
          }}>
          뒤로가기
          </button>&nbsp;
          <button className="btn btn-success" onClick={test}>alert</button>
        </div>
      </div>
    </div>  
    
  )
}

function STOCKDIVINFO (param) {
  console.log('stockdiv',param)
  return (
    <div>재고  : {param.param}</div>
  )
}

function TabContent (param) {
  useEffect(()=>{
    param.switchAniUpdate(true)
  })
  if (param.tabNum === 0) {
    return <div> 상품설명 </div>
  } else if (param.tabNum === 1) {
    return <div> 배송정보 </div>
  } else {
    return <div> 기본 값</div>
  }
}

function getCreateStore(state) {
  return {
      // name: state[0].name
      state: state
  }
}
 
export default connect(getCreateStore)(Detail)
// export default Detail;