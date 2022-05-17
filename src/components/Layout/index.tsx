import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { isUserAuthenticated } from "../../actions/user";
import authDeviceStorage from "../../services/authDeviceStorage";

const Layout = ({children}: any) => {
    const dispatch: Dispatch<any> = useDispatch();
    useEffect(() => {
        const getToken = async () => {
            let result = await authDeviceStorage.getItem("JWT_TOKEN");
            if(result) dispatch(isUserAuthenticated({isLoggedIn: true, users:JSON.parse(result)}));
        }
        getToken()
    }, [dispatch])
    return(
        <>
            {children}
        </>
    )
}

export default Layout;