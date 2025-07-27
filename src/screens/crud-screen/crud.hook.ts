import axios from 'axios';
import React, { useState } from 'react';

type userType = {
  id: string ;
  name: string;
  email: string;
};

const useCRUD = () => {
  const [usersData, setUsersData] = React.useState<userType[]>([]);
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

  // const BASE_URL = 'http://10.0.2.2:3000'; // ← use this for Android emulator but not working on physical device 192.168.85.203
  const BASE_URL = 'http://192.168.85.203:3000'; // ← use this for a physical device android
  // const BASE_URL = 'http://192.168.x.x:3000'; // ← use your IP for physical device


  // now I have to write the each function to create, update and delete the fetch data that covers CRUD operations
  const fetchData = async () => {
    setRefreshing(true); // start the refreshing state
    try{
      const response = await axios.get(`${BASE_URL}/users`);

      if(response.status === 200){
        // menas I have scuccessfully fetched the data
        // so I have to update the usersData state 
        setUsersData(response.data);
        setRefreshing(false); // stop the refreshing state
      }
    }catch(error){
      console.log("Error fetching data:", error);
      setRefreshing(false); // stop the refreshing state even if there is an error
    }
  };

  const deleteUser = async (userId:string) => {
    try{
      console.log("delete this particular user :", userId);

      const response = await axios.delete(`${BASE_URL}/users/${userId}`);
      if(response.status === 200){
        // means I have sucessfully deleted the user
        // then I have to remove that user from the my users data state
        setUsersData((prevUsers:any) => {
         return  prevUsers.filter((currentUser:any) => {
            if(currentUser.id !== userId){
              return true; // keep this user
            }
            else{
              return false; //remove that user because that user got deleted 
            }
          })
        })
      }
      
    }catch(error){
      console.log("Error Deleting the data :" , error)
    }
  };

  const updateUser = async (userId :string, userName : string, userEmail:string) => {
    try{
        console.log("update this particular user :", userId, userName, userEmail);

        const response = await axios.put(`${BASE_URL}/users/${userId}` , {
          name:userName,
          email:userEmail
        });

        if(response.status === 200){
          // means I have sucessfully updated the user data 
          // now I have to update the usersData state
          setUsersData((prevUsers:any) => {
            return prevUsers.map((currentUser :any , currentUserIndex : any) => {
              if(currentUser.id === userId){
                // means for the current user I have to update the data 
                return {
                  ...currentUser,
                  name:userName,
                  email:userEmail
                }
              }
              else{
                // I wanted this user as it is
                return currentUser;
              }
            })
          });



        }
    }catch(error){
      console.log("Error updating the user data:", error);
    }
  };

  const createNewUser = async (userId :string, userName :string, userEmail:string) => {
    // now I wanted to add the data in the my DataView.json file so I will use the post method 

    try{

      const response = await axios.post(`${BASE_URL}/users` , {
        id:userId,   
        name:userName,
        email:userEmail
      });

      console.log("response from the create user API:", response);

      if(response.status === 201){
        // means I have sucessfully created the user and added in the data.json file 
        // now I have to update the userdata State also 
        setUsersData((prevUsers:any) => {
          return [...prevUsers , response.data]; //adding the currentlly creatyed new user 
        })
      }
    }catch(error){
      console.log("Error creating new user:", error);
    }
  };

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
    createNewUser,
  };
};

export default useCRUD;
