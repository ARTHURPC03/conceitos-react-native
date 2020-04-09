import React, { useState, useEffect } from "react";
import api from './services/api'

import arthur from './assets/pp.jpeg'

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet, 
  TouchableOpacity,
  Image,
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await api.get("/repositories");
      setRepositories(response.data);
    }

    fetchData();
  }, []);
  
  async function handleLikeRepository(id) {
    try {
      const { data: newRepository } = await api.post(`/repositories/${id}/like`);
      setRepositories(
        repositories.map((repository) =>
          repository.id === id ? newRepository : repository
        )
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.myName}>ARTHUR PC</Text>
        
        <Image source={arthur} style={styles.arthur} />
      </View>
      <FlatList
        data={repositories}
        keyExtractor={repository => repository.id}
        renderItem={({ item: repository }) => (
          <View style={styles.repositoryContainer}>
          <Text style={styles.repository}>{repository.title}</Text>

          <View style={styles.techsContainer}>
            {repository.techs.map(tech => (
              <Text key={tech} style={styles.tech}>
                {tech}
              </Text>
            ))}
        
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              testID={`repository-likes-${repository.id}`}
            >
              {repository.likes} curtidas
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repository.id)}
            testID={`like-button-${repository.id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
        )}
      />  
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#202020",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#F5F5F5",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#F5F5F5",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#F5F5F5",
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#F5F5F5",
    backgroundColor: "#7159c1",
    padding: 15,
  },
  myName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#F5F5F5",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  arthur: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  profile: {
    alignItems: "center",
    marginBottom: 20,
  }
});
