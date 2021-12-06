import React, {useEffect, useState} from 'react';
import { useHistory , useParams} from 'react-router';
import Styled from 'styled-components';
// import './detail.scss';

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



function Detail(param){

    // 컴포넌트가 mount, update 되었을 때
    useEffect( ()=>{
      console.log('언제 실행??21111111111111111')
    });
    console.log('언제실행?222222222222222')
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
    console.log(temp)

    function test() {
      alert('11')
    }

    return (
      <div className="container" >
        <Box>
          <BoxDetail setColor="green">제목입니다.</BoxDetail>
        </Box>
        <div className="row">
          <div className="col-md-6">
            <img src={temp.src} width="100%" />
          </div>
          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{temp.title}</h4>
            <p>{temp.content}</p>
            <p>{temp.price}</p>
            <button className="btn btn-danger">주문하기</button>&nbsp;
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

export default Detail;