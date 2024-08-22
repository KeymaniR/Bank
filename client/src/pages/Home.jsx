import { AuthContext } from "../context/AuthContext";
import { useContext, Component } from "react";
import React from "react";
import { Alert, Button, Form, Row, Col, Container, Stack } from "react-bootstrap";
import LoginForm from "../components/homepage/loginForm";
import namiImage from "../images/Nami-One-Piece-Money.png"
import {Panel, PanelGroup} from 'rsuite';


const Home = () => {
    const {user} = useContext(AuthContext);
    return ( 
        <div>
    <Stack className="homeBanner">
        <Container>
            <Row>
                <Col md={4}>
                </Col>
     <Col md={4} className="center">
        <div className="bannerText">
            Hello and welcome to BeriSense!🍈<br/>
            Indulge in your pirate greed and relish in the experience of managing your finances across the 4 seas!
        </div>
        </Col>
        <Col md={1}>
        </Col>
        <Col md={3}>
       {!user && ( <LoginForm/> )}
       </Col>
       </Row>
       </Container>
    </Stack>
    <Stack>
        <Container>
        <h3 className="center">Explore what you can do with your CurrenSea!</h3>
        </Container>
    </Stack>
    <br/>
    <Stack>
        <Container>
            <Row className="justify-content-md-center">
                <Col md="3">
                    <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                        <img src={namiImage} alt="Image Here" height="180" width="250"/>
                        <Panel header="RSUITE">
                            <p>
                                <small>
                                A suite of React components, sensible UI design, and a friendly development experience.
                                </small>
                            </p>
                         </Panel>
                    </Panel>

                </Col>

                <Col md="3">
                    <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                    <img src={namiImage} alt="Image Here" height="180" width="250" />
                        <Panel header="RSUITE">
                            <p>
                                <small>
                                A suite of React components, sensible UI design, and a friendly development experience.
                                </small>
                            </p>
                         </Panel>
                    </Panel>
                </Col>

                <Col md="1">
                    <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 240 }}>
                    <img src={namiImage} alt="Image Here" height="180" width="250" />
                        <Panel header="RSUITE">
                            <p>
                                <small>
                                A suite of React components, sensible UI design, and a friendly development experience.
                                </small>
                            </p>
                         </Panel>
                    </Panel>
                </Col>
            </Row>
        </Container>
    </Stack>


    </div>

  
);}
export default Home;