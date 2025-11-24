import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, SafeAreaView, Text } from 'react-native'
import TodoList from './components/TodoList'
import AddTodoForm from './components/AddTodoForm'
import { useTodos } from './hooks/useTodos'

export default function App() {
  const { todos, loading, addTodo, toggleTodo } = useTodos()

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
