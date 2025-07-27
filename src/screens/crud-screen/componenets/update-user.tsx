import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, { use } from 'react';
const UpdateUser = (props: any) => {
  const { updateFormData, setUpdateFormData, updateUser } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📝 Update User</Text>
      {/* Add your update user form here */}
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
          keyboardType="numeric"
          value={updateFormData.id.toString()}
          onChangeText={text =>
            setUpdateFormData((prev: any) => ({
              ...prev,
              id: text || '',
            }))
          }
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
          value={updateFormData.name}
          onChangeText={text =>
            setUpdateFormData((prev: any) => ({ ...prev, name: text }))
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
          value={updateFormData.email}
          onChangeText={text =>
            setUpdateFormData((prev: any) => ({ ...prev, email: text }))
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

              // then I have to make sure that the update form data is reset
              setUpdateFormData({
                id: '',
                name: '',
                email: '',
              });
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
  );
};

const styles = StyleSheet.create({
  container: {
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

export default UpdateUser;
