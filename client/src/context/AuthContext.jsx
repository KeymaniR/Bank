import { useCallback, useState, useEffect, createContext } from "react";
import { baseUrl, postRequest, patchRequest } from "../utils/services"


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [data, setUpdateData] = useState({
        balance: 0.00
    });
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(null);
    const [registerInfo, setRegisterInfo] = useState({
        userName: "",
        email: "",
        password: "",
        balance: 0.00,
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        userName: "",
        password: ""
    });
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [currentInfo, setCurrentInfo] = useState({
        userName: "",
        email: ""
    })

    useEffect(() =>{
        const user = localStorage.getItem("User");
        
        setUser(JSON.parse(user));
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []); {/*Callback is used to optimize the function so its not called each time*/}

    const updateLoginInfo = useCallback((info) =>{
        setLoginInfo(info);
    }, []);  {/*Callback is used to optimize the function so its not called each time*/}

    const updateCurrentInfo = useCallback((info) => {
        setCurrentInfo(info);
    },[])

    //Edit Profile
    const openEditMode = useCallback(async(e) => {

        e.preventDefault();

        setIsInEditMode(true);
    },[]);


    //Register User

    const registerUser = useCallback(async(e) =>{
        
        e.preventDefault();

        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));


        setIsRegisterLoading(false);

        if(response.error){
            return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, [registerInfo]);



    //Login User

    const loginUser = useCallback(async(e) => {
        
        e.preventDefault();

        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo)); //Passing in login info to the server side

        

        setIsLoginLoading(false);

        if(response.error){
            return setLoginError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
    }, [loginInfo]);

    const logoutUser = useCallback(() =>{
        localStorage.removeItem("User"); //Empty the storage when logging out
        setUser(null);
        setLoginInfo(
            userName = "",
            password = ""
        );
        
    }, []) 


 const updateBalance = useCallback((info) =>{
        setUpdateData(info);
    }, []);


const processTransaction = useCallback(async(userId, balance) =>{
        
        data.balance = balance;

        const response = await patchRequest(`${baseUrl}/users/${userId}`, JSON.stringify(data))

        if(response.error){
            console.log(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);

    },[data]);

    
    
const confirmEdit = useCallback(async(userId) => {
        
        const response = await patchRequest(`${baseUrl}/users/edit/${userId}`, JSON.stringify(currentInfo));

        if(response.error){
            console.log(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);

        setIsInEditMode(false);
    }, [currentInfo])

const cancelEdit = useCallback(async() =>{
    window.location.reload();
    setIsInEditMode(false);

},[])
 


    return (<AuthContext.Provider value = {{
        user,
        data,
        loginUser,
        logoutUser,
        loginInfo,
        confirmEdit,
        currentInfo,
        isLoginLoading,
        loginError,
        updateLoginInfo,
        updateCurrentInfo,
        updateRegisterInfo,
        registerUser,
        setLoginInfo,
        setUpdateData,
        processTransaction,
        registerError,
        isRegisterLoading,
        registerInfo,
        updateBalance,
        isInEditMode,
        openEditMode,
        cancelEdit
    }}
    >
    {children}
    </AuthContext.Provider>
);
};