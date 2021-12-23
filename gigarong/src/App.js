/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import { Navbar,Container,Nav,NavDropdown,Button,Carousel } from 'react-bootstrap';
import data from './data.js';
import backImg from './background.jpg';
import React, { useContext, useState } from 'react';
import Detail from './Detail.js';
import axios from 'axios';

import { Link, Route, Switch, useHistory } from 'react-router-dom';

import Cart from './Cart.js';
import { connect } from 'react-redux';

export let productContext = React.createContext();


function App(aaa) {
  console.log('aaa',aaa)
  let [shoes, shoesUpdate] = useState(data) // 신발 목록
  let [flag, flagUpdate] = useState(true) // 컴포넌트 flag값
  let [picNum, picNumUpdate] = useState(3)
  console.log('App.js ~~')

  let [stock, stockUpdate] = useState([10,11,12])

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Ogil JJang</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link> <Link to="/">Home</Link> </Nav.Link> */}
              <Nav.Link as={Link} to="/">Home </Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* switch component 여러개가 맞아도 하나만 보여주고 싶을 때 (중복매칭 X) */}
      <Switch>

        {/* exact는 포함되어도 무시 */}
        <Route exact path="/"> 
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={backImg}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>20% Season Off</h3>
                <p>Nulla vitae elit libero, a pharetra e mollis interdum. Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <br/>
          
          <div className="container">
            {/* props로 계속 넘겨받고 싶지 않고 복잡할 때 */}
            <productContext.Provider value={shoes[0].id}>
              <div className="row">
                {/* 위에 반복 container 반복문으로 컴포넌트 생성 */}
                {
                  shoes.map((item, idx)=> {
                    return <SHOESCOMPONENT shoes={item} idx={idx} key={idx}></SHOESCOMPONENT>
                  })
                }
              </div>
            </productContext.Provider>
          </div>
           {/* 더보기 버튼 */}
          <button className="btn btn-danger" onClick={ ()=>{
            // 링크 바꿔서 테스트
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((res)=>{ 
                console.log('성공')
                console.log(res) 
                let tempShoes = [...shoes, ...res.data]
                // let pushShoes = tempShoes.concat(res.data)

                tempShoes.filter((item,idx) => {
                  if (item.src == null || item.src == undefined) {
                    picNumUpdate(picNum++)
                    item.src = 'https://codingapple1.github.io/shop/shoes'+ picNum +'.jpg'
                  }
                  return item
                })

                shoesUpdate(tempShoes)
              })
              .catch(()=>{
                console.log('실패') })
          }}> 더보기 </button> 
        </Route>
        

        {/* :id란 detail/ 뒤에 아무거나 와도 보여줘라 */}
        {/* :작명 */}
        {/* /:id/:id/:id 가능 */}
        {/* <Route path="/" component={Detail}></Route> */}
        {/* <Route path="/detail/:id">
          <Detail shoes={shoes} stock={stock} stockUpdate={stockUpdate}/>
        </Route>  */}

        {/* createContext로 전달하고 싶을 때 */}
        <Route path="/detail/:id">
          <productContext.Provider value={stock}>
            <Detail shoes={shoes} stock={stock} stockUpdate={stockUpdate}/>
          </productContext.Provider>
        </Route> 

        <Route path="/:id">
          <Cart></Cart>
        </Route>


        {/* /'아무문자'써도 라는 경로를 의미 */}
        <Route path="/:id">
          <div>아무거나 적어도 이게 보임</div>
        </Route>
      </Switch>
    </div>
  );
}


function SHOESCOMPONENT (param,idx) {
  // productContext.Provider
  let temp = useContext(productContext)
  console.log('temp===========', param)

  let history = useHistory()
  return (
    <div className="col-md-4" onClick={ () => { history.push('/detail/' + param.idx) }}> 
      <img src={param.shoes.src} width="100%"></img>
      <h4>{param.shoes.title} </h4>
      <p>{param.shoes.content} </p>
      <p>{param.shoes.price}</p>
      <TEST></TEST>
    </div>
  )
};

function TEST () {
  let test = useContext(productContext)
  return (<p>useContext 테스트 : {test}</p>)
}


// function Detail(){
//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
//         </div>
//         <div className="col-md-6 mt-4">
//           <h4 className="pt-5">상품명</h4>
//           <p>상품설명</p>
//           <p>120000원</p>
//           <button className="btn btn-danger">주문하기</button> 
//         </div>
//       </div>
//   </div>  
//   )
// };

// index에서 reducer test
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

export default connect(getCreateStore)(App)
// export default App;
