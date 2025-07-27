import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';

const CreateUser = (props: any) => {
  const { newUserData, setNewUserData, createNewUser } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.header}> Create User </Text>
      {/* Add your create user form here */}
      <View style={styles.card}>
        <TextInput
          placeholder="Enter User ID"
          placeholderTextColor="black"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 10,
          }}
          value={newUserData.id}
          onChangeText={text =>
            setNewUserData((prev: any) => ({ ...prev, id: text }))
          }
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Enter User Name"
          placeholderTextColor="black"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 10,
          }}
          value={newUserData.name}
          onChangeText={text =>
            setNewUserData((prev: any) => ({ ...prev, name: text }))
          }
        />

        <TextInput
          placeholder="Enter User Email"
          placeholderTextColor="black"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 10,
          }}
          value={newUserData.email}
          onChangeText={text =>
            setNewUserData((prev: any) => ({ ...prev, email: text }))
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
              setNewUserData({ id: '', name: '', email: '' });
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
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor:"red",
    width: '95%',
    alignSelf: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2a2a2a',
    // marginBottom: 20,
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
});

export default CreateUser;
