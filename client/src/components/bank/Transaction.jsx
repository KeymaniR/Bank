import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BankContext } from "../../context/BankContext";
import { Button, Table, InputGroup, Form } from "react-bootstrap";

const Transaction = () => {
    const { user, data, updateBalance, processTransaction } = useContext(AuthContext);
    const { userTransaction, createTransaction } = useContext(BankContext);
    
if(userTransaction?.length < 1){
    return(
        <>
            No Transactions Yet..
            <Button variant="success" type = "submit" onClick={() => create()}>
                {
                    "Test add transaction"
                }
            </Button>
        </>
    )
}else{
    return( 
        <>
            <Table striped bordered hover responsive className="transaction">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Transaction Type</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                {userTransaction && userTransaction.map((t, index) =>{
                    return <tr key={index}>
                                <td>{`${t.transDate}`}</td>
                                <td>{`${t.transType}`} </td>
                                <td>{`${t.description}`}</td>
                                <td>{`$${(t.difference/100).toFixed(2)}`}</td>
                                <td>{`$${(t.endBalance/100).toFixed(2)}`}</td>
                            </tr>
                })
                   
                }
                </tbody>
            </Table>

            <InputGroup className="mb-3">
            <Button variant="outline-secondary" type = "submit" onClick={() => create("Withdraw", parseFloat(data.balance))}>
                    Withdraw
            </Button>
            <Button variant="outline-secondary" type = "submit" onClick={() => create("Deposit", parseFloat(data.balance))}>
                    Deposit
            </Button>
                <Form.Control
                aria-describedby="basic-addon1"
                onChange = {(e) => updateBalance({...data, balance: e.target.value})}
                />
            </InputGroup>
        </>

    );
}

    
function create(transType, Amount){

    var finalBalance = 0;

    if (transType === 'Withdraw'){
        finalBalance = user?.balance - Amount;
    }else{
        finalBalance = parseFloat(user?.balance) + Amount;
    }

    createTransaction(user?._id, transType, "Publix", user?.balance, parseFloat(finalBalance), Amount, getDate());

    processTransaction(user?._id, finalBalance);

}};

function getDate(){
    var currentDate = new Date();
    var hours = 0;
    var minutes = 0;
    var secs = 0;
    var meridiem;

    if(currentDate.getHours() > 12){
        hours = currentDate.getHours() - 12;
    }else{
        hours = currentDate.getHours()
    }

    if(currentDate.getHours() >= 12){
        meridiem = "PM"
    }else{
        meridiem = "AM"
    }

    if(currentDate.getMinutes() < 10){
        minutes = `0${currentDate.getMinutes()}`
    }else{
        minutes = currentDate.getMinutes();
    }

    if(currentDate.getSeconds() < 10){
        secs = `0${currentDate.getSeconds()}`
    }else{
        secs = currentDate.getSeconds();
    }

    var date = `${(currentDate.getMonth()+1)}-${currentDate.getDate()}-${currentDate.getFullYear()} ${hours}:${minutes}:${secs} ${meridiem}`;

    return date;
}


 
export default Transaction;