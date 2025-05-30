import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost, patchPost, deletePost } from '../queries/posts';

export default function PostItem({ post }) {
  const queryClient = useQueryClient();
  const [editMode, setEditMode] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: post.title,
    body: post.body,
  });

  const updateMutation = useMutation({
    mutationFn: () =>
      updatePost({ id: post.id, updatedPost: editedPost }),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setEditMode(false);
    },
  });

  const patchMutation = useMutation({
    mutationFn: () =>
      patchPost({ id: post.id, title: editedPost.title }),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setEditMode(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  return (
    <View style={styles.postContainer}>
      {editMode ? (
        <>
          <TextInput
            style={styles.input}
            value={editedPost.title}
            onChangeText={(text) =>
              setEditedPost({ ...editedPost, title: text })
            }
            placeholder="Title"
          />
          <TextInput
            style={styles.input}
            value={editedPost.body}
            onChangeText={(text) =>
              setEditedPost({ ...editedPost, body: text })
            }
            placeholder="Body"
          />
          <Button title="Save (PUT)" onPress={updateMutation.mutate} />
          <Button title="Patch Title Only" onPress={patchMutation.mutate} />
          <Button title="Cancel" onPress={() => setEditMode(false)} />
        </>
      ) : (
        <>
          <Text style={styles.title}>{post.title}</Text>
          <Text>{post.body}</Text>
          <Button title="Edit" onPress={() => setEditMode(true)} />
          <Button title="Delete" onPress={() => deleteMutation.mutate()} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    padding: 5,
    marginVertical: 5,
  },
});
