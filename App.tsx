import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, SafeAreaView, Text, Alert } from 'react-native'
import { Todo } from './components/TodoItem'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import { TodoStorageService } from './services/TodoStorageService'

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)

  // Load todos from storage on app startup
  useEffect(() => {
    loadTodos()
  }, [])

  // Save todos to storage whenever todos change
  useEffect(() => {
    if (!loading) {
      saveTodos()
    }
  }, [todos, loading])

  const loadTodos = async () => {
    try {
      const storedTodos = await TodoStorageService.loadTodos()
      setTodos(storedTodos)
    } catch (error) {
      Alert.alert('Error', 'Failed to load todos')
    } finally {
      setLoading(false)
    }
  }

  const saveTodos = async () => {
    try {
      await TodoStorageService.saveTodos(todos)
    } catch (error) {
      Alert.alert('Error', 'Failed to save todos')
    }
  }

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: text,
      completed: false,
    }
    setTodos(prevTodos => [newTodo, ...prevTodos])
  }

  const toggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo list</Text>
      </View>
      
      <AddTodoForm onAddTodo={addTodo} />
      
      <TodoList todos={todos} onToggleTodo={toggleTodo} />
      
      <StatusBar style="auto" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  title: {
    paddingTop: 35,
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
})
