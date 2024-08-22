import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import {Link} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () =>{
   const {user, logoutUser, loginInfo} = useContext(AuthContext);

    return <Navbar className="=mb-4" style={{height: "3.76rem", backgroundColor: "#FAF9F6"}}>
            <Container>
                <h2>
                    <Link to="/home" className="link-dark text-decoration-none">BeriSense🍈</Link>
                </h2>

                {user && (<span className="text-dark">
                     <Link to="/" className="text-dark text-decoration-none">{user?.userName}'s Account </Link>
                </span>)}
                <Nav>
                    <Stack direction = "horizontal" gap = "3">
                        <Link to="/home" className="link-dark text-decoration-none">
                            Home
                        </Link>
                       {user && (<>
                        <Link to="/account" className="link-dark text-decoration-none">
                            Profile
                       </Link>
                       <Link onClick={() => logoutUser()} to="/home" className="link-dark text-decoration-none">
                            Logout
                        </Link>
                       </>)}

                        {!user && (<>
                        <Link to="/login" className="link-dark text-decoration-none">
                            Login
                        </Link>
                        <Link to="/register" className="link-dark text-decoration-none">
                            Register
                        </Link>
                    </>)}
                    </Stack>
                </Nav>
            </Container>
            </Navbar>

};

export default NavBar;