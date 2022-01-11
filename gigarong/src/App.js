/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import { Navbar,Container,Nav,NavDropdown,Button,Carousel,Accordion } from 'react-bootstrap';
import data from './data.js';
import backImg from './background.jpg';
import React, { useContext, useEffect, useState } from 'react';
import Detail from './Detail.js';
import axios from 'axios';
 
import Login from './Login.js';
import SignUp from './SignUp.js';


import { Link, Route, Switch, useHistory } from 'react-router-dom';

import Cart from './Cart.js';
import { connect } from 'react-redux';

export let productContext = React.createContext();


function App(aaa) {
  console.log('aaa',aaa)
  let [shoes, shoesUpdate] = useState(data) // 신발 목록
  let [flag, flagUpdate] = useState(true) // 컴포넌트 flag값
  let [picNum, picNumUpdate] = useState(3)

  let [loginText, loginTextUpdate] = useState('로그인')
  let [storage, storageUpdate] = useState([])

  let [chngFlag, setChngFlag] = useState(false)

  console.log('App.js ~~')

  let [stock, stockUpdate] = useState([10,11,12]) 


  // 빈값, 빈배열, 빈객체
  function fn_isEmpty(value){ 
    if( value === "" || value === null || value === undefined || ( value !== null && typeof value === "object" && !Object.keys(value).length) ){  
      return true
    } else { 
      return false 
    }
  }

  // 최근 봤던 상품 표시.
  function fn_preDataView () {
      if ( fn_isEmpty(localStorage.getItem('preData')) ) { // localStorage에 데이터가 없을 때
        return <div><p>데이터가 없습니다.</p></div>
      } else { // 데이터가 있을 때
        let shoes1 = []
        let getLocalShoes = JSON.parse(localStorage.getItem('preData'))  
        getLocalShoes = [... new Set(getLocalShoes)] 
        for (let i = 0 ; i < shoes.length; i++) {
          for ( let k = 0; k < getLocalShoes.length; k++) {
            if (shoes[i].id === getLocalShoes[k]) {
              shoes1.push(shoes[i])
            }
          }
        }
        console.log('shoesView',shoes1)
        // setChngFlag(false)
        return ( 
            shoes1.map((item, idx) => {
              console.log('********************', item);
              return <SHOESCOMPONENT shoes={item} idx={idx} setChngFlag={setChngFlag}  key={idx}></SHOESCOMPONENT> 
            })
        )
      }
    }
    useEffect(() => {
      fn_preDataView()
    }, [chngFlag])
    // 최근 봤던 상품 표시 끝

    // 자주본상품
    function fn_morePreDataView () {
      let pData = localStorage.getItem('preData')
      if ( fn_isEmpty(pData)) { // localStorage에 데이터가 없을 때
        return <div><p>데이터가 없습니다.</p></div>
      } else { // 데이터가 있을 때
        let shoes1 = []
        let getLocalShoes = JSON.parse(localStorage.getItem('preData'))  

        // 2번이하일때는 <p>데이터가 없습니다</p>
        // 3번이상일때는 표시.

        for (let i = 0 ; i < shoes.length; i++) {
          for ( let k = 0; k < getLocalShoes.length; k++) {
            if (shoes[i].id === getLocalShoes[k]) {
              shoes1.push(shoes[i])
            }
          }
        }
        return ( 
            shoes1.map((item, idx) => {
              console.log('********************', item);
              return <SHOESCOMPONENT shoes={item} idx={idx} setChngFlag={setChngFlag}  key={idx}></SHOESCOMPONENT> 
            })
        )
      }
    }


  /** TODO 한번본상품11111, 여러본 본상품 구현111111111
   *       팝업띄워보기 (세일하는, 신상품 등등)
   *       사이드바 (채팅기능(1:1문의), 맨위로, 맨아래로)
   *       간이결제
   *       로그인11111,로그아웃,정보
   * 
   */

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Ogil JJang</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link> <Link to="/">Home</Link> </Nav.Link> */}
              {/* <Nav.Link as={Link} to="/">Home </Nav.Link> */}
              <Nav.Link as={Link} to="/detail">Detail </Nav.Link>
              <Nav.Link as={Link} to="/Login">{ loginText } </Nav.Link>
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
          
          {/* 최근본상품 */}
          {/* defaultActiveKey="0" */} 
          <Accordion >
            <Accordion.Item eventKey="0">
              <Accordion.Header>최근 본 상품</Accordion.Header>
              <Accordion.Body> 
                  {
                    fn_preDataView() 
                  } 
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>자주 본 상품</Accordion.Header>
              <Accordion.Body>
                {
                  fn_morePreDataView()
                }
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="container">
            {/* props로 계속 넘겨받고 싶지 않고 복잡할 때 */}
            <productContext.Provider value={shoes[0].id}>
              <div className="row">
                {/* 위에 반복 container 반복문으로 컴포넌트 생성 */}
                {
                  shoes.map((item, idx)=> {
                    return <SHOESCOMPONENT shoes={item} idx={idx} key={idx} fn_isEmpty={fn_isEmpty}></SHOESCOMPONENT>
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
          <br />
          <br />
          <br />

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

        <Route path="/Login">
          <Login></Login>
        </Route>

        <Route path="/Cart">
          <Cart></Cart>
        </Route>

        <Route path="/SignUp">
          <SignUp></SignUp>
        </Route>

        {/* /'아무문자'써도 라는 경로를 의미 */}
        <Route path="/:id">
          <div>아무거나 적어도 이게 보임</div>
        </Route>
      </Switch>
 
    </div>
  );
}


function SHOESCOMPONENT (param) {
  // productContext.Provider
  let temp = useContext(productContext)
  console.log('temp===========', param)
  function fn_detailPageMove(idx) {
    let arr = JSON.parse(localStorage.getItem('preData'))
    let preData = []
    if (param.fn_isEmpty(arr)) { // arr이 비어있따면
      preData.push(idx)
    } else { // arr이 비어있지 않으면
      arr = [...arr]
      arr.push(idx)
      preData = arr
    }
    localStorage.setItem('preData',JSON.stringify(preData))

    history.push('/detail/' + idx) 
  } // end

  let history = useHistory()

  return (
    <div className="col-md-4" onClick={ () => { fn_detailPageMove(param.idx);  }}> 
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
