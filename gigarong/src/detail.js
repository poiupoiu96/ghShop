import React, {useState} from 'react';
import { useHistory , useParams} from 'react-router';

function Detail(param){

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
    let temp = param.shoes.find((item)=>{
        return item.id == id
    })
    console.log(temp)
    return (
      <div className="container">
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
            </button>
          </div>
        </div>
    </div>  
    )
}

export default Detail;