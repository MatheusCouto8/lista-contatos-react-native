import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function ContactItem({ item, index, onEdit, onDelete }) {
  return (
    <View style={styles.taskItemContainer}>
      <View style={{ flex: 1 }}>
        <Text style={styles.taskItem}>{item.name}</Text>
        <Text style={styles.taskItemPhone}>{item.phone}</Text>
        <Text style={styles.taskItemCategory}>{item.category}</Text>
      </View>
      <View style={styles.taskButtons}>
        <Pressable
          onPress={() => onEdit(index)}
          style={[styles.taskButton, styles.editButton]}
        >
          <Feather name="edit" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() => onDelete(index)}
          style={[styles.taskButton, styles.deleteButton]}
        >
          <Feather name="trash-2" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  taskItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  taskItemPhone: {
    fontSize: 14,
    color: '#555',
  },
  taskItemCategory: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  taskButtons: {
    flexDirection: 'row',
  },
  taskButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 4,
  },

});