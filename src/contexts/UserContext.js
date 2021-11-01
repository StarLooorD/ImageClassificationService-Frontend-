import axios from "axios";
import {createContext, useContext, useState} from "react";
import {useAuth} from "./AuthContext";

const API_URL = process.env.REACT_APP_API_URL;

const UserContext = createContext();

export const UserProvider = (props) => {
    const API_V1_URL = `${API_URL}/api/v1`;
    const auth = useAuth();

    const getMe = (props) => {
        return auth.authorize().then(idToken => {

            // TODO: remove token logging
            console.log(idToken);

            let config = {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                }
            }

            return axios.get(`${API_V1_URL}/users/me`, config);
        })
    }

    const createUser = (props) => {
        return auth.authorize().then(idToken => {
            let config = {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                }
            }

            console.log(props)

            return axios.post(`${API_V1_URL}/users`, props, config);
        })
    }

    const getUsers = (props) => {
        return auth.authorize().then(idToken => {
            let config = {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                }
            }

            return axios.get(`${API_V1_URL}/users`, config);
        })
    }

    const getUserById = (props) => {
        return auth.authorize().then(idToken => {
            let config = {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                }
            }

            return axios.get(`${API_V1_URL}/users/${props.user_id}`, config);
        })
    }

    const updateUserById = (props) => {
        return auth.authorize().then(idToken => {
            let config = {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                }
            }

            return axios.put(`${API_V1_URL}/users/${props.user_id}`, config);
        })
    }

    const deleteUserById = (props) => {
        return auth.authorize().then(idToken => {
            let config = {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                }
            }

            return axios.delete(`${API_V1_URL}/users/${props}`, config);
        })
    }

    const value = {
        createUser: props.createUser || createUser,
        getUsers: props.getUsers || getUsers,
        getMe: props.getMe || getMe,
        getUserById: props.getUserById || getUserById,
        updateUserById: props.updateUserById || updateUserById,
        deleteUserById: props.deleteUserById || deleteUserById,
    };

    return(
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
};

