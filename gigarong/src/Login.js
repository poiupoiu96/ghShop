import React, { useContext, useEffect, useState } from 'react';
import { InputGroup, FormControl, Form, Row, Col, Button} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';


// email인증 api 연동

function Login () {
    
    let [validated, setValidated] = useState(false) // form validation Check
    let [userInfo, setUserInfo] = useState( {id: '', pw: ''} )
    let [msg, setMsg] = useState('안녕하세요 :D')
    let history = useHistory()

    useEffect( ()=>{
        let temp = JSON.stringify(userInfo)
        localStorage.setItem('loginInfo',JSON.stringify({id: 'gksrlfgud', pw: 'a123'}))
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

    // 로그인 버튼
    function fn_loginSubmit () {
        let flag = false
        let loId = userInfo.id
        let loPw = userInfo.pw

        let store = JSON.parse(localStorage.getItem('loginInfo'))
        console.log('userInfo',userInfo)
        if (fn_isEmpty(loId)) {
            setMsg('ID를 정확히 입력해주세요.') 
            flag = true
        } else if(fn_isEmpty(loPw)) {
            setMsg('비밀번호를 정확히 입력해주세요.') 
            flag = true
        }

        if (flag) { 
            return false
        } else {
            if (fn_isEmpty(store)) {
                alert('신규 가입 하시겠습니까?')
                return false
            }
            if (store.id !== loId) {
                alert('일치하는 id가 없습니다.')
                return false
            } else if (store.pw !== loPw) {
                alert('비밀번호를 확인해주세요.')
                return false
            }
        }

        // 로그인 성공
        history.push('./')

    }


    // const handleSubmit = (event) => {
    //   const form = event.currentTarget
    //   if (form.checkValidity() === false) { // vaildation check
    //     // react에서는 false라해서 멈추는게 아님 밑에 함수들로 한번 더 막아줘야함
    //     event.preventDefault()
    //     event.stopPropagation()
    //   }
      
    //   // validation에 어긋나는게 없다면 true 상태로 update
    //   setValidated(true)
    // }; 
    
    function LOGINFORM () {
        return (
        <div>
            <InputGroup className="mb-2">
                <InputGroup.Text id="inputGroup-sizing-sm"> ID </InputGroup.Text>
                <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="ID를 입력하세요." onChange={ (e) => {fn_setId(e.target.value, 'id')}}/>
            </InputGroup>
            <br />
            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm"> PW </InputGroup.Text>
                <FormControl aria-label="Default" aria-describedby="inputGroup-sizing-default" placeholder="password를 입력하세요." onChange={ (e) => {fn_setId(e.target.value, 'pw')}}/>
            </InputGroup>
            <div>
                <p>{ msg }</p>
            </div>
            <br /> 
            <Button onClick={ fn_loginSubmit }>로그인</Button> &nbsp;
            <Button variant="warning" onClick={ () => {history.push('/SignUp')}}>회원가입</Button>
            {/* <Form>
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
                </Form.Group>
                </Row>
                <Button onClick={ fn_loginSubmit }>로그인</Button>
            </Form> */}

        </div>
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