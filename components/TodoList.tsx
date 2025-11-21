import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'
import TodoItem, { Todo } from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggleTodo: (id: string) => void
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo }) => {
  const renderTodoItem = ({ item }: { item: Todo }) => (
    <TodoItem todo={item} onToggle={onToggleTodo} />
  )

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No tasks yet!</Text>
      <Text style={styles.emptySubtext}>Add your first task above</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={todos.length === 0 ? styles.emptyListContainer : styles.listContainer}
        ListEmptyComponent={renderEmptyComponent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    fontWeight: '500',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#aaa',
  },
})

export default TodoList