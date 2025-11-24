import { useReducer, useEffect } from 'react'
import { Todo } from '../components/TodoItem'
import { TodoStorageService } from '../services/TodoStorageService'

// Määrittellään action-tyypit
type TodoAction =
  | { type: 'SET_TODOS'; payload: Todo[] }
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }

// Määritellään state-rajapinta
interface TodoState {
  todos: Todo[]
  loading: boolean
}

// Aloitustila
const initialState: TodoState = {
  todos: [],
  loading: true,
}

// Reducer funktio
const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'SET_TODOS':
      return {
        ...state,
        todos: action.payload,
      }
    
    case 'ADD_TODO':
      const newTodo: Todo = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        text: action.payload,
        completed: false,
      }
      return {
        ...state,
        todos: [newTodo, ...state.todos],
      }
    
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        ),
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      }
    
    default:
      return state
  }
}

// Custom hookki
export const useTodos = () => {
  const [state, dispatch] = useReducer(todoReducer, initialState)

  // Lataa tehtävät alussa
  useEffect(() => {
    loadTodos()
  }, [])

  // Tallenna tehtävät aina kun ne muuttuvat
  useEffect(() => {
    if (!state.loading) {
      saveTodos()
    }
  }, [state.todos, state.loading])

  const loadTodos = async () => {
    try {
      const storedTodos = await TodoStorageService.loadTodos()
      dispatch({ type: 'SET_TODOS', payload: storedTodos })
    } catch (error) {
      console.error('Failed to load todos:', error)
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const saveTodos = async () => {
    try {
      await TodoStorageService.saveTodos(state.todos)
    } catch (error) {
      console.error('Failed to save todos:', error)
    }
  }

  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', payload: text })
  }

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id })
  }

  return {
    todos: state.todos,
    loading: state.loading,
    addTodo,
    toggleTodo,
  }
}
