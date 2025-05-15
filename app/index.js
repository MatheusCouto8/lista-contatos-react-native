import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import ContactItem from '../components/ContactItem'; // Importa o componente ContactItem

function formatPhoneNumber(number) {
  const cleaned = number.replace(/\D/g, '').slice(0, 11);
  if (cleaned.length <= 2) {
    return `(${cleaned}`;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  } else if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  } else {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
}

export default function HomeScreen() {
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Amigo');
  const [editIndex, setEditIndex] = useState(null);

  function addOrEditContact() {
    if (!newName || !newPhone) return;

    const updatedContacts = [...contacts];
    const formattedPhone = formatPhoneNumber(newPhone);

    if (editIndex === null) {
      updatedContacts.push({ name: newName, phone: formattedPhone, category: selectedCategory });
    } else {
      updatedContacts[editIndex] = { name: newName, phone: formattedPhone, category: selectedCategory };
      setEditIndex(null);
    }

    setContacts(updatedContacts);
    setNewName('');
    setNewPhone('');
    setSelectedCategory('Amigo');
    setModalVisible(false);
  }

  function confirmDelete(index) {
    Alert.alert(
      'Excluir contato?',
      `Remover "${contacts[index].name}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const updatedContacts = [...contacts];
            updatedContacts.splice(index, 1);
            setContacts(updatedContacts);
          },
        },
      ]
    );
  }

  function openEditModal(index) {
    setNewName(contacts[index].name);
    setNewPhone(contacts[index].phone);
    setSelectedCategory(contacts[index].category || 'Amigo');
    setEditIndex(index);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item, index }) => (
          <ContactItem
            item={item}
            index={index}
            onEdit={openEditModal}
            onDelete={confirmDelete}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum contato adicionado!</Text>
        }
      />

      <Pressable
        onPress={() => {
          setNewName('');
          setNewPhone('');
          setSelectedCategory('Amigo');
          setEditIndex(null);
          setModalVisible(true);
        }}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>＋</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex === null ? 'Novo Contato' : 'Editar Contato'}
            </Text>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="Nome"
              style={styles.input}
            />
            <TextInput
              value={newPhone}
              onChangeText={(text) => setNewPhone(formatPhoneNumber(text))}
              placeholder="Telefone"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <View style={styles.categoryContainer}>
              {['Amigo', 'Família', 'Trabalho'].map((category) => (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryButtonText,
                      selectedCategory === category && styles.categoryButtonTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Pressable onPress={addOrEditContact} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>
                {editIndex === null ? 'Adicionar' : 'Salvar'}
              </Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 25,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
    fontSize: 14,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoryButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  categoryButtonSelected: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  categoryButtonText: {
    color: '#333',
  },
  categoryButtonTextSelected: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButtonText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 14,
  },
});