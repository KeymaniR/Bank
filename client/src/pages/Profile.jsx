import { useContext } from "react";
import { Container, Stack, Button, Form, Row, Col } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";


const Profile = () => {

    const {user,
        isInEditMode,
        openEditMode,
        confirmEdit,
        cancelEdit,
        currentInfo,
        updateCurrentInfo
    } = useContext(AuthContext);


    return (
    <Form onSubmit={openEditMode}>
        <Row style = {{height: "100vh", justifyContent:"center", paddingTop: "20%", backgroundColor: "rgb(40,40,40)"}}>
            <Col xs={6}>   
            
             <Form.Group className="mb-3">
                 <Form.Label>Username</Form.Label>
                      {isInEditMode ? <Form.Control type="text" placeholder={user?.userName} onChange={(e) => updateCurrentInfo({...currentInfo, userName: e.target.value})}/> :
                    <Form.Control style={{color: "white"}}plaintext readOnly defaultValue={user?.userName} />}
                </Form.Group>
            

            
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                      {isInEditMode ? <Form.Control type="email" onChange={(e) => updateCurrentInfo({...currentInfo, email: e.target.value})}/> :
                    <Form.Control style={{color: "white"}} plaintext readOnly defaultValue={user?.email}/>}
                </Form.Group>
                {!isInEditMode ? 
                <Button variant="success" type = "submit">
                    Edit Profile
                </Button> : 
                <Button variant="success" onClick={() => confirmEdit(user?._id)}>
                Confirm
                </Button> 
            }
            {!isInEditMode ? "" : 
            <Button variant="success" onClick={() => cancelEdit()}>
                Cancel
            </Button>}

            </Col>
        </Row>
    </Form>
    )
}


 
export default Profile;