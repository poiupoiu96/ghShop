import React, { useContext, useEffect, useState } from 'react';
import { InputGroup, FormControl, Form, Row, Col, Button} from 'react-bootstrap';


// email인증 api 연동

function Login () {
    
    let [validated, setValidated] = useState(false) // form validation Check
    let [userInfo, setUserInfo] = useState( {id: '', pw: ''} )

    useEffect( ()=>{
        let temp = JSON.stringify(userInfo)
        localStorage.setItem('loginInfo',temp)
    }, []);

    // 빈값, 빈배열, 빈객체
    function fn_isEmpty(value){ 
        if( value === "" || value === null || value === undefined || ( value !== null && typeof value === "object" && !Object.keys(value).length) ){  
        return true
        } else { 
        return false 
        }
    }

/**
 * 
 *  1. 사용자 로그인 창 진입
 *  2. 사용자 아이디, 비밀번호 작성 후 로그인 버튼 클릭
 *  3. 스토리지에 사용자가 입력한 아이디랑 같은게 있는지 비교
 *          있다면 ===> 비밀번호도 비교
 *               비교후 맞다면 ===> 메인 페이지 이동 (추후에 보던 페이지로 이동하게)
 *               비교후 없다면 ===> 빨간 테두리 & 틀렸다는 메세지
 *          없다면 ===> 회원가입 창으로 이동할거냐는 alert 띄움
 *                ok 누르면 이동
 *                cancel 누르면 alert만 종료 
 */


    // 기존고객인지 아닌지 비교하기 위해 저장
    function fn_setId(data, type) {
        if (type === 'id') {
            userInfo.id = data
            setUserInfo(userInfo)
        } else {
            userInfo.pw = data
            setUserInfo(userInfo)
        }
        console.log(userInfo)
    }


    const handleSubmit = (event) => {
      const form = event.currentTarget
      if (form.checkValidity() === false) { // vaildation check
        // react에서는 false라해서 멈추는게 아님 밑에 함수들로 한번 더 막아줘야함
        event.preventDefault()
        event.stopPropagation()
      }
      
      // validation에 어긋나는게 없다면 true 상태로 update
      setValidated(true)
    }; 
    
    function LOGINFORM () {
        return (
        <Form>
            <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
            <br />
                <Form.Label> 아이디 </Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="ID를 입력하세요."
                onChange={ (e) => {fn_setId(e.target.value, 'id')}}
                defaultValue=""
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
            <br />
                <Form.Label>비밀번호</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="password를 입력하세요." 
                onChange={ (e) => {fn_setId(e.target.value, 'pw')}}
                defaultValue=""
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            </Row>
            <Button type="submit" onClick={ (e) => {fn_loginSubmit(e)}}>로그인</Button>
        </Form>
        )
    }


    return (
        <div>
            <br />
            <br />
            <LOGINFORM></LOGINFORM>
        </div>
    )
}

export default Login