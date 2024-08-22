import { createContext, useState, useEffect, useCallback } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client";

export const BankContext = createContext();


export const BankContextProvider = ({children, user}) =>{
   const [userTransaction, setUserTransaction] = useState([]);
   const [transactionError, setTransactionError] = useState(null);
   const [socket, setSocket]  = useState(null);
   const [bankUsers, setBankUsers] = useState(null);

   useEffect(() => {
      const newSocket = io("http://localhost:3000");
      setSocket(newSocket);

      return () => {
         newSocket.disconnect();
      }
   }, [user]);

   useEffect(() => {

      if(socket === null) return;
      socket.emit("addNewUser", user?._id);

      socket.on("getAllBankUsers", (res) => {
         setBankUsers(res);
      });

      return () => {
         socket.off("getAllBankUsers");
      }

   }, [socket]);


   const createTransaction = useCallback (async (userId, transType, description, begBalance, endBalance, difference, transDate) => {

      const response = await postRequest(`${baseUrl}/transactions`, 
         JSON.stringify({
            userId,
            transType,
            description,
            begBalance,
            endBalance,
            difference,
            transDate
         }));

         if(response.error){
            return setTransactionError(response);
         }

         setUserTransaction((prev) => [...prev, response]);

   }, []);


   useEffect(() =>{
   
      const getTransactions = async () => {
         if(user?._id){

      const response = await getRequest(`${baseUrl}/transactions/${user?._id}`);
    
      if(response.error){
         return setTransactionError(response);
      }
      setUserTransaction(response);
      
      }
   }

   getTransactions();
},[user, userTransaction]);



useEffect(() => {

   const getUpdatedBalance = async ()=>{
      if(user?._id){
         const response = await getRequest(`${baseUrl}/transactions/getUpdate/${user?._id}`);

         if(response.error){
            console.log(response);
            return response;
         }
      }
   }
   getUpdatedBalance();
},[user])




   return <BankContext.Provider value={{
      userTransaction,
      createTransaction
   }}
   >
    {children}
   </BankContext.Provider>
};