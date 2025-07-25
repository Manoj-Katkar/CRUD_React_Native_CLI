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
} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import useCRUD from './crud.hook';

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

      {/* Update the Data  */}
      <View>
        <Text style={styles.header}>📝 Update User</Text>
        {/* Add your update user form here */}
        <View style={styles.card}>
          <TextInput
            placeholder="Enter User ID"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              marginBottom: 10,
            }}
            keyboardType="numeric"
            value={updateFormData.id.toString()}
            onChangeText={text =>
              setUpdateFormData((prev: any) => ({
                ...prev,
                id: parseInt(text) || '',
              }))
            }
          />

          <TextInput
            placeholder="Enter User Name"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              marginBottom: 10,
            }}
            value={updateFormData.name}
            onChangeText={text =>
              setUpdateFormData(prev => ({ ...prev, name: text }))
            }
          />

          <TextInput
            placeholder="Enter User Email"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              marginBottom: 10,
            }}
            value={updateFormData.email}
            onChangeText={text =>
              setUpdateFormData(prev => ({ ...prev, email: text }))
            }
          />

          <Pressable
            onPress={() => {
              if (
                updateFormData.id &&
                updateFormData.name &&
                updateFormData.email
              ) {
                updateUser(
                  updateFormData.id,
                  updateFormData.name,
                  updateFormData.email,
                );
              } else {
                Alert.alert('Please fill all fields before updating.');
              }
            }}
            style={{
              backgroundColor: '#1a73e8',
              padding: 12,
              borderRadius: 8,
              marginTop: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Update User
            </Text>
          </Pressable>
        </View>
      </View>

      <View>
        <Text style={styles.header}> Create User </Text>
        {/* Add your create user form here */}
        <View style={styles.card}>
                    <TextInput
            placeholder="Enter User ID"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              marginBottom: 10,
            }}
            value={newUserData.id}
            onChangeText={text =>
              setNewUserData(prev => ({ ...prev, id: text }))
            }
            keyboardType='numeric'
          />
          <TextInput
            placeholder="Enter User Name"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              marginBottom: 10,
            }}
            value={newUserData.name}
            onChangeText={text =>
              setNewUserData(prev => ({ ...prev, name: text }))
            }
          />

          <TextInput
            placeholder="Enter User Email"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              marginBottom: 10,
            }}
            value={newUserData.email}
            onChangeText={text =>
              setNewUserData(prev => ({ ...prev, email: text }))
            }
          />

          <Pressable
            onPress={() => {
              if (newUserData.name && newUserData.email) {
                // Call your create user function here
                // For example, createUser(newUserData);
                console.log('Creating user:', newUserData);
                createNewUser(
                  newUserData.id,
                  newUserData.name,
                  newUserData.email,
                );
                setNewUserData({ id: '', name: '', email: '' }); // Reset form after submission
              } else {
                Alert.alert('Please fill all fields before creating.');
              }
            }}
            style={{
              backgroundColor: '#1a73e8',
              padding: 12,
              borderRadius: 8,
              marginTop: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Create User
            </Text>
          </Pressable>
        </View>
      </View>
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
    paddingBottom: 20,
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
