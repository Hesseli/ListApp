import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, todo.completed && styles.completed]}
      onPress={() => onToggle(todo.id)}
      activeOpacity={0.7}
    >
      <View style={styles.textContainer}>
        <Text style={[styles.text, todo.completed && styles.completedText]}>
          {todo.text}
        </Text>
      </View>
      <View style={[styles.checkbox, todo.completed && styles.checkedBox]}>
        {todo.completed && <Text style={styles.checkmark}>✓</Text>}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 2,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  completed: {
    backgroundColor: '#f0f0f0',
    opacity: 0.8,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  checkedBox: {
    backgroundColor: '#007AFF',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default TodoItem