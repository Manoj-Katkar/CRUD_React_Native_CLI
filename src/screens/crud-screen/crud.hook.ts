import axios from 'axios';
import React, { useState } from 'react';

const useCRUD = () => {
  const [usersData, setUsersData] = React.useState([]);
  // update user data 
  const [updateFormData, setUpdateFormData] = React.useState({
    id: '',
    name: '',
    email: '',
  });

  // create the new user data
  const [newUserData, setNewUserData] = useState({
    id: '',
    name: '',
    email: '',
  });

  const [refreshing, setRefreshing] = useState(false);

  const BASE_URL = 'http://10.0.2.2:3000'; // ← use this for Android emulator
  // const BASE_URL = 'http://192.168.x.x:3000'; // ← use your IP for physical device

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      if (response.status === 200) {
        setUsersData(response.data);
        setRefreshing(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await axios.delete(`${BASE_URL}/users/${id}`);
      if (response.status === 200) {
        setUsersData((prevUsers: any) =>
          prevUsers.filter((user: any) => user.id !== id),
        );
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (
    id: string | number,
    name: string,
    email: string,
  ) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/${id}`, {
        name,
        email,
      });
      if (response.status === 200) {
        setUsersData((prevUsers: any) =>
          prevUsers.map((user: any) =>
            user.id === id ? { ...user, name, email } : user,
          ),
        );
        setUpdateFormData({ id: '', name: '', email: '' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const createNewUser = async (id: string, name: string, email: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, {
        id,
        name,
        email,
        });
        if (response.status === 200) {
          // setUsersData([...usersData, response.data]);
          setUsersData((prevUsers: any) => [...prevUsers, response.data]);
          setNewUserData({ id: '', name: '', email: '' });
        }
    }
    catch (error) {
      console.error('Error creating new user:', error);
    }
  }

  return {
    fetchData,
    usersData,
    setUsersData,
    deleteUser,
    updateFormData,
    setUpdateFormData,
    updateUser,
    refreshing,
    setRefreshing,
    newUserData,
    setNewUserData,
    createNewUser
  };
};

export default useCRUD;
