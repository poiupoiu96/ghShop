// 장바구니 기능 추가 fff

import React from 'react';
import { Table} from 'react-bootstrap'
import { connect } from 'react-redux';

// 카트 
function Cart (props) {
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품컬러</th>
                    <th>상품명</th>
                    <th>수량</th> 
                    <th>변경</th> 
                </tr>
            </thead>
            <tbody>
                {
                    props.state.map((item, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{idx}</td>
                                <td>{ item.id }</td>
                                <td>{ item.name }{idx}</td>
                                <td>{ item.quan }</td>
                                <td> <button onClick={()=>{ props.dispatch({type: 'quanAdd', idx : idx}) }}> + </button> &nbsp;
                                <button onClick={()=>{ props.dispatch({type: 'quanMin', idx : idx}) }}> - </button></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

// redux store 데이터 가져와서 props로 변환해주는 함수
// 함수 만들고 export default connect(함수명)(return)
function getCreateStore(state) {
    return {
        // name: state[0].name
        state: state
    }
}

// function TableDiv (param,idx) { 
//     console.log(param)
//     return (
//         <tr key={param.idx}>
//             <td>{param.idx}</td>
//             <td>{ param.param.id }</td>
//             <td>{ param.param.name }{param.idx}</td>
//             <td>{ param.param.quan }</td>
//             <td> <button onClick={()=>{ param.param.dispatch({type: 'quanUpdate'}) }}> + </button></td>
//         </tr>
//     )
// }

export default connect(getCreateStore)(Cart)

// export default Cart;
