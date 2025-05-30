// App.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './utils/queryClient';
import PostList from './components/PostList';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Text style={styles.title}>Post Manager</Text>
        <PostList />
      </View>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
