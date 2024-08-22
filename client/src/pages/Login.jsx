import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack, FloatingLabel } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    
    const {loginUser,
            loginError,
            loginInfo,
            updateLoginInfo,
            isLoginLoading} = useContext(AuthContext);

return <>
<Form onSubmit={loginUser}> {/* Whenever we submit, call the login user function */}
        <Row style = {{height: "100vh", justifyContent:"center", paddingTop: "20%", backgroundColor: "rgb(40,40,40)"}}>
            <Col xs={6}>
                <Stack gap={3}>
                    <h2>Login</h2>
                    <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                    <Form.Control type="text" placeholder="Username" onChange={(e) => updateLoginInfo({...loginInfo, userName: e.target.value})}/>
                        </FloatingLabel>
                    
                    <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
                    <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo({...loginInfo, password: e.target.value})}/>
                    </FloatingLabel>

                    <Button variant="success" type="submit">
                        {isLoginLoading ? "Logging in..." : "Login"}
                    </Button>
                    {loginError?.error && <Alert variant="danger"><p>{loginError?.message}</p></Alert>}
                    
                </Stack>
            </Col>
        </Row>
</Form>

    </>;
}
 
export default Login;