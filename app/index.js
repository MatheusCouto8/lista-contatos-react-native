// app/index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  FlatList,
  Alert,
  StyleSheet
} from 'react-native';
  
  

export default function HomeScreen() {
  const [contacts, setContacts] = useState([]); // Lista de contatos
  const [modalVisible, setModalVisible] = useState(false); // Modal visível ou não
  const [newName, setNewName] = useState(''); // Nome do novo contato
  const [newPhone, setNewPhone] = useState(''); // Telefone do novo contato
  const [editIndex, setEditIndex] = useState(null); // Índice do contato em edição

  // Função para adicionar ou editar contato
  function addOrEditContact() {
    if (!newName || !newPhone) return; // Se os campos estiverem vazios, não faz nada

    const updatedContacts = [...contacts];
    const formattedPhone = formatPhoneNumber(newPhone); // Formata o número de telefone

    if (editIndex === null) {
      // Adiciona um novo contato
      updatedContacts.push({ name: newName, phone: formattedPhone });
    } else {
      // Edita um contato existente
      updatedContacts[editIndex] = { name: newName, phone: formattedPhone };
      setEditIndex(null); // Limpa o índice de edição
    }

    setContacts(updatedContacts); // Atualiza o estado com a lista de contatos modificada
    setNewName(''); // Limpa o campo de nome
    setNewPhone(''); // Limpa o campo de telefone
    setModalVisible(false); // Fecha o modal
  }

  // Função para confirmar exclusão de contato
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
            updatedContacts.splice(index, 1); // Remove o contato do array
            setContacts(updatedContacts); // Atualiza o estado
          },
        },
      ]
    );
  }

  // Função para abrir o modal em modo de edição
  function openEditModal(index) {
    setNewName(contacts[index].name); // Carrega o nome do contato no campo de edição
    setNewPhone(contacts[index].phone); // Carrega o telefone do contato no campo de edição
    setEditIndex(index); // Define o índice do contato a ser editado
    setModalVisible(true); // Abre o modal
  }

  return (
    <View style={styles.container}>
      {/* Botão para abrir o modal */}
      <Pressable
        onPress={() => {
          setNewName('');
          setNewPhone('');
          setEditIndex(null);
          setModalVisible(true);
        }}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>＋ Novo Contato</Text>
      </Pressable>

      {/* Lista de contatos */}
      <FlatList
        data={contacts}
        keyExtractor={(_, i) => String(i)} // Identificador único para cada item
        renderItem={({ item, index }) => (
          <View style={styles.taskItemContainer}>
            <View style={{ flex: 1 }}>
              <Text style={styles.taskItem}>{item.name}</Text>
              <Text style={styles.taskItemPhone}>{item.phone}</Text>
            </View>
            <View style={styles.taskButtons}>
              {/* Botões para editar e excluir */}
              <Pressable
                onPress={() => openEditModal(index)} // Abre o modal para editar
                style={[styles.taskButton, styles.editButton]}
              >
                <Text style={styles.buttonText}>✏️</Text>
              </Pressable>
              <Pressable
                onPress={() => confirmDelete(index)} // Exclui o contato
                style={[styles.taskButton, styles.deleteButton]}
              >
                <Text style={styles.buttonText}>🗑️</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum contato adicionado!</Text>
        }
      />

      {/* Modal para adicionar ou editar contato */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 8 }}>
              {editIndex === null ? 'Digite seu novo contato:' : 'Edite o contato:'}
            </Text>
            <TextInput
              value={newName} // O valor do campo de texto é controlado pelo estado `newName`
              onChangeText={setNewName} // Atualiza o estado com o novo texto
              placeholder="Nome:"
              style={styles.input}
            />
            <TextInput
              value={newPhone} // O valor do campo de texto é controlado pelo estado `newPhone`
              onChangeText={setNewPhone} // Atualiza o estado com o novo texto
              placeholder="Telefone:"
              keyboardType="phone-pad"
              style={styles.input}
            />
            <Pressable onPress={addOrEditContact} style={{ marginBottom: 8 }}>
              <Text style={{ color: '#6200ee', textAlign: 'center' }}>
                {editIndex === null ? 'Adicionar' : 'Salvar alterações'}
              </Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#999', textAlign: 'center' }}>
                Cancelar
              </Text>
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
    padding: 16,
  },
  addButton: {
    marginBottom: 16,
    alignSelf: 'center',
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  taskItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 6,
  },
  taskItem: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskItemPhone: {
    fontSize: 14,
    color: '#666',
  },
  taskButtons: {
    flexDirection: 'row',
  },
  taskButton: {
    marginLeft: 8,
    padding: 6,
    borderRadius: 4,
  },
  editButton: {
    backgroundColor: '#ffca28', // Cor de edição (amarelo)
  },
  deleteButton: {
    backgroundColor: '#f44336', // Cor de exclusão (vermelho)
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#666',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo escuro com transparência
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
});