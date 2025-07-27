import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import useCRUD from './crud.hook';
import UpdateUser from './componenets/update-user';
import CreateUser from './componenets/create-user';

const CRUD = () => {
  const {
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
  } = useCRUD();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // console.log('Users data updated from CRUD screen:', usersData);
  }, [usersData]);

  const renderEachUser = useCallback(
    ({ item }: any) => {
      return (
        <View style={styles.card}>
          <Text style={styles.userId}>#{item.id}</Text>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>

          {/* now delete the particular record */}
          <TouchableOpacity
            onPress={() => {
              deleteUser(item.id);
            }}
          >
            <Text style={{ color: 'red', marginTop: 10 }}>Delete User</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [usersData],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>📋 User List</Text>
        {/* Read the data  */}

        <FlatList
          data={usersData}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={renderEachUser}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No users found</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            fetchData();
          }}
        />
      </View>
      {/* <ScrollView> */}
      {/* Update the Data  */}
      <UpdateUser
        updateUser={updateUser}
        updateFormData={updateFormData}
        setUpdateFormData={setUpdateFormData}
      />
      {/* create the user form */}
      <CreateUser
        newUserData={newUserData}
        setNewUserData={setNewUserData}
        createNewUser={createNewUser}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2a2a2a',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a73e8',
    marginTop: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
    fontStyle: 'italic',
  },
  listContent: {
    paddingBottom: 60,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});
export default CRUD;
