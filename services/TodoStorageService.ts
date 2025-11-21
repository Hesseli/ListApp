import AsyncStorage from '@react-native-async-storage/async-storage'
import { Todo } from '../components/TodoItem'

const STORAGE_KEY = '@todolist_todos'

export const TodoStorageService = {
  // Tallentaa tehtävät AsyncStorageen
  async saveTodos(todos: Todo[]): Promise<void> {
    try {
      const jsonValue = JSON.stringify(todos)
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
    } catch (error) {
      console.error('Error saving todos:', error)
      throw new Error('Failed to save todos')
    }
  },

  // Lataa tehtävät AsyncStoragesta
  async loadTodos(): Promise<Todo[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      if (jsonValue != null) {
        return JSON.parse(jsonValue)
      }
      return []
    } catch (error) {
      console.error('Error loading todos:', error)
      return []
    }
  },

  // Tyhjentää kaikki tehtävät tallennustilasta
  async clearTodos(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing todos:', error)
      throw new Error('Failed to clear todos')
    }
  },

  // Tarkistaa onko tallennettuja tehtäviä
  async hasTodos(): Promise<boolean> {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
      return jsonValue != null
    } catch (error) {
      console.error('Error checking todos:', error)
      return false
    }
  }
}