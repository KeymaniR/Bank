//Performing the http request to get info from the server side
import React, { useState, useEffect } from "react";

export const baseUrl = "http://localhost:5000/api";


export const postRequest = async(url, body) => { //Communication with the backend

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body
    });

    const data = await response.json();

    if(!response.ok){ //error handling
        let message

        if(data?.message){
            message = data.message;
        }else{
            message = data;
        }
        return {error: true, message};
    }
    return data; //Gonna be whatever we get back from the server side
};



export const getRequest = async(url) => {
    
    const response = await fetch(url);

    const data = await response.json();

    if(!response.ok){//Error handling
        let message = "An error occured...";

        if(data?.message){
            message = data.message;
        }

        return {error: true, message};
    }
    return data;
}


export const patchRequest = async(url, body) => {

    const response = await fetch(url, {
        method: "PATCH",
        headers:{"Content-Type": "application/json"},
        body
    });

    const data = await response.json();

    if(!response.ok){ //error handling
        let message

        if(data?.message){
            message = data.message;
        }else{
            message = data;
        }
        return {error: true, message};
    }
    return data; //Gonna be whatever we get back from the server side
};