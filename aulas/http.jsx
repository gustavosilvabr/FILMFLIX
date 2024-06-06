import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {api} from  "./services/api";
import YoutubeIframe from "react-native-youtube-iframe";

export default function App() {

  const [dataLancamentosFilmes, setDataLancamentosFilmes] = useState([]);
  const [dataPopulares, setDataPopulares] = useState([]);
  const [playing, setPlaying] = useState(false);

  const apiFilmesLançamentos = async () => {
    const response = await api.get(
      "https://api.themoviedb.org/3/movie/now_playing?language=pt-br&page=1"
    );
    setDataLancamentosFilmes(response.data.results);
  };
  const apiSeriesPopulares = async () => {
    const response = await api.get(
      "https://api.themoviedb.org/3/tv/popular?language=pt-br&page=1"
    );
    setDataPopulares(response.data.results);
  };

  useEffect(() => {
    apiFilmesLançamentos();
    apiSeriesPopulares();
  }, []);
1
  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar />
        <Image
          style={styles.logo}
          resizeMode="cover"
          source={require("./logo.png")}
        />
        <View style={styles.containerLançamentos}>
          <Text style={styles.titleLancamentos}>Filmes Lançamentos</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={dataLancamentosFilmes}
            keyExtractor={(item) => item.title.toString()}
            renderItem={({ item }) => (
              <View style={styles.containerFilmes}>
                <View style={styles.filme}>
                  <TouchableOpacity>
                  <Image
                    resizeMode="cover"
                    style={styles.img}
                    source={{
                      uri: `http://image.tmdb.org/t/p/w500/${item.poster_path}`,
                    }}
                  />
                  </TouchableOpacity>
                 
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.containerLançamentos}>
          <Text style={styles.titleLancamentos}>Series Populares</Text>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={dataPopulares}
            renderItem={({ item }) => (
              <View style={styles.containerFilmes}>
                <View style={styles.filme}>
                  <TouchableOpacity>
                  <Image
                    resizeMode="cover"
                    style={styles.img}
                    source={{
                      uri: `http://image.tmdb.org/t/p/w500/${item.poster_path}`,
                    }}
                  />
                  </TouchableOpacity>
                  
                </View>
              </View>
            )}
          />
        </View>
        <View style={styles.containerYoutube}>
          <Text style={styles.textYoutube}>Trailer Planeta dos Macacos</Text>
          <YoutubeIframe

            height={340}
            play={playing}
            videoId="BYezatXnMuw"
            width={"90%"}
          />
          <View style={styles.containerButtons}>
            <TouchableOpacity
              style={styles.containerButton}
              onPress={() => setPlaying(true)}
            >
              <Text style={styles.button}>PLAY</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerButton}>
              <Text style={styles.button} onPress={() => setPlaying(false)}>
                PAUSAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>
       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000f0",
  },
  logo: {
    width: 150,
    height: 50,
    marginLeft: -10,
  },
  containerLançamentos: {
    padding: 10,
  },
  titleLancamentos: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  img: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  containerFilmes: {
    marginRight: 10,
    marginTop: 10,
    alignItems: "flex-start",
  },

  containerWeb: {
    height: 500,
  },
  containerYoutube: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 20,
  },
  textYoutube: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "white",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#d42157",
  },
  containerButton: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 10,
  },
  button: {
    color: "black",
  },
  containerButtons: {
    flexDirection: "row",
    gap: 50,
    marginTop: -50,
  },
});