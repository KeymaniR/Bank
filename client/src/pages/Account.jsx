import { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import  Transaction  from "../components/bank/Transaction";

const Account = () => {

    const {user} = useContext(AuthContext);

    return ( 
            <Container>
                <Stack direction="horizontal" gap={4}>
                <p className="welcomeMsg"> Welcome {user?.userName}!  </p>
                </Stack>
                <Stack>
                <p> Balance: ${user?.balance}</p>
                 </Stack>
            <Transaction/>
            </Container>
    )
}
        
        
       
export default Account;