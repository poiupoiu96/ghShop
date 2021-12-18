// 장바구니 기능 추가

import React from 'react';
import { Table} from 'react-bootstrap'

// 카트 
function Cart () {
    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경</th> 
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td> 
                </tr>
                <tr>
                    <td>2</td>
                    <td>Table cell</td>
                    <td>Table cell</td>
                    <td>Table cell</td> 
                </tr>
            </tbody>
        </Table>
    )
}

export default Cart;
