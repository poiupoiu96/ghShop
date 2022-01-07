import React, { useContext, useEffect, useState } from 'react';
import { InputGroup, FormControl, Form, Row, Col, Button} from 'react-bootstrap';


// email인증 api 연동

function Login () {
    
    let [validated, setValidated] = useState(false) // form validation Check
    let [userInfo, setUserInfo] = useState( {id: '', pw: '', email: '' } )

    // 로컬 스토리지에 저장해서 로그인 로그아웃 사용해보기.
    function fn_setId() {

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
    
    function TEST () {
        return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
            <br />
                <Form.Label> 아이디 </Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="ID를 입력하세요."
                onChange={fn_setId}
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
                defaultValue=""
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <br />

            <Form.Group as={Col} md="4" controlId="validationCustom02">
            <br />
                <Form.Label>이메일</Form.Label>
                <Form.Control
                required
                type="text"
                placeholder="이메일 앞"
                defaultValue=""
                /> 
                </Form.Group>
                    <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="이메일 뒤"
                        aria-describedby="inputGroupPrepend"
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        email 주소를 확인하세요.
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            </Row>   
            <Form.Group className="mb-3">
            <Form.Check
                required
                label="약관 동의 이에 동의합니다."
                feedback="You must agree before submitting."
                feedbackType="invalid"
            />
            </Form.Group>
            <Button type="submit">Submit form</Button>
        </Form>
        )
    }


    return (
        <div>
            <br />
            <br />
            <TEST></TEST>
        </div>
    )
}

export default Login