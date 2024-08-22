import { AuthContext } from "../../context/AuthContext";
import { useContext, Component } from "react";
import React from "react";
import { Alert, Button, Form, Row, Col, Stack, FloatingLabel } from "react-bootstrap";
import {Link} from "react-router-dom";

const loginForm = () => {

    const {loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading} = useContext(AuthContext);
        
        return (
            <Form  onSubmit={loginUser} className="text-dark" style={{width: "350px"}}>
                <Row style={{justifyContent: "center"}}>
                    <Col>
                        <Stack className="loginForm" gap={2} style={{backgroundColor: "#BFCC82"}}>
                            <h2 style={{margin: "auto"}}>Welcome back</h2>
                            
                            <FloatingLabel controlId="floatingInpu" label="Username" className="mb-2">
                                <Form.Control type="text" placeholder="Username" onChange={(e) => updateLoginInfo({...loginInfo, userName: e.target.value})}/>
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Password" className="mb-2">
                                <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})}/>
                            </FloatingLabel>

                            <Button variant="success" type="submit">
                                 {isLoginLoading ? "Logging in..." : "Login"}
                             </Button>
                            <Link className="text-dark text-decoration-none">
                                {"Forgot Username or Password"}
                            </Link>

                              {loginError?.error && <Alert variant="danger"><p>{loginError?.message}</p></Alert>}

                        </Stack>
                    </Col>
                </Row>
            </Form>

          );
}
 
export default loginForm ;