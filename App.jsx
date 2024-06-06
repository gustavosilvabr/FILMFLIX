import React, { Component } from 'react';
import {StatusBar,AsyncStorage, StyleSheet, Text, TextInput, TouchableOpacity, TouchableOpacityBase, View, Keyboard } from 'react-native';
import HeaderComponent from './components/header.jsx';
import CardPostComponent from './components/cardPost.jsx';
export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      input:'',
      nome:'',

    }
    this.gravarNome = this.gravarNome.bind(this)
  }

 async  componentDidMount(){
    await AsyncStorage.getItem('nome').then((value)=>{
      this.setState({nome:value});
    })
  }
  async componentDidUpdate(_,prevState){
      const nome = this.state.nome;
      if(prevState !== nome){
       await AsyncStorage.setItem('nome',nome)
      }
  }
  gravarNome(){
    this.setState({
      noem:this.state.input
    });
    alert('salvo com sucesso');
    Keyboard.dismiss();
  }
  render() {
    return (
      <View style={styles.container}>
           <StatusBar/>
          <View style={styles.ViewIput}>
            <TextInput
            style={styles.input}
            value={this.state.input}
            onChangeText={(text) => this.setState({input:text})}
            underlineColorAndroid="transparent"
            />
            <TouchableOpacity onPress={this.gravarNome}>
                <Text style={styles.botao}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.nome}>
            {this.state.nome}
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    marginTop:20,
    alignItems:'center',
  },
  ViewIput:{
    flexDirection:'row',
    alignItems:'center',
  },
  input:{
    flex:1,
    height:40,
    borderColor:'black',
    borderWidth:1,
    padding:10,
    margin:10,
  },
  botao:{
    backgroundColor:'#222',
    color:'white',
    height:40,
    padding:10,
    marginLeft:3
  },
  nome:{
    fontSize:30,
    marginTop:20,
  }

});
