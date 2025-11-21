import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'

interface AddTodoFormProps {
  onAddTodo: (text: string) => void
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('')

  const handleSubmit = () => {
    const trimmedText = text.trim()
    if (trimmedText.length === 0) {
      Alert.alert('Error', 'Please enter a task')
      return
    }
    
    onAddTodo(trimmedText)
    setText('')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter task..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        returnKeyType="done"
        multiline={false}
        maxLength={200}
      />
      <TouchableOpacity 
        style={[styles.addButton, text.trim().length === 0 && styles.addButtonDisabled]}
        onPress={handleSubmit}
        disabled={text.trim().length === 0}
        activeOpacity={0.7}
      >
        <Text style={styles.addButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 12,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default AddTodoForm