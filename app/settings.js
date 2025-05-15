import React from 'react';
import { View, Text, Pressable, StyleSheet, Switch, Alert } from 'react-native';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleNotifications = () => setNotificationsEnabled((prev) => !prev);

  const handleAboutPress = () => {
    Alert.alert(
      'Sobre o App',
      'MyContacts v1.0\nDesenvolvido para gerenciar seus contatos com facilidade.',
      [{ text: 'OK' }]
    );
  };

  // Estilos dinâmicos baseados no modo escuro
  const dynamicStyles = isDarkMode
    ? {
        container: { backgroundColor: '#121212' },
        text: { color: '#ffffff' },
        item: { backgroundColor: '#1e1e1e', borderColor: '#333' },
      }
    : {
        container: { backgroundColor: '#f9f9f9' },
        text: { color: '#333' },
        item: { backgroundColor: '#fff', borderColor: '#ddd' },
      };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.title, dynamicStyles.text]}>Configurações</Text>

      {/* Alterar Tema */}
      <View style={[styles.settingItem, dynamicStyles.item]}>
        <Text style={[styles.settingText, dynamicStyles.text]}>Modo Escuro</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>

      {/* Notificações */}
      <View style={[styles.settingItem, dynamicStyles.item]}>
        <Text style={[styles.settingText, dynamicStyles.text]}>Notificações</Text>
        <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
      </View>

      {/* Sobre o App */}
      <Pressable style={[styles.settingItem, dynamicStyles.item]} onPress={handleAboutPress}>
        <Text style={[styles.settingText, dynamicStyles.text]}>Sobre o App</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
  },
  settingText: {
    fontSize: 16,
  },
});