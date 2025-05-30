import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { getPosts, createPost } from '../queries/posts';
import PostItem from './PostItem';

export default function PostList() {
  const queryClient = useQueryClient();
  const [userId, setUserId] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    body: '',
    userId: 1,
  });

  const postsQuery = useQuery({
    queryKey: ['posts', userId],
    queryFn: () =>
      getPosts().then((data) =>
        userId ? data.filter((post) => post.userId == userId) : data
      ),
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setNewPost({ title: '', body: '', userId: 1 });
    },
  });

  if (postsQuery.isLoading) return <Text>Loading posts...</Text>;
  if (postsQuery.isError) return <Text>Error loading posts.</Text>;

  return (
    <View>
      <TextInput
        placeholder="Filter by userId"
        value={userId}
        onChangeText={setUserId}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="New Post Title"
        value={newPost.title}
        onChangeText={(text) => setNewPost({ ...newPost, title: text })}
        style={styles.input}
      />

      <TextInput
        placeholder="New Post Body"
        value={newPost.body}
        onChangeText={(text) => setNewPost({ ...newPost, body: text })}
        style={styles.input}
      />

      <Button title="Add Post" onPress={() => createMutation.mutate(newPost)} />

      <FlatList
        data={postsQuery.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostItem post={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 4,
  },
});
