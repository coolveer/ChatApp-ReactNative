import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from "react-native-gifted-chat";
import Firebase from '../Firebase';

export default class Chat extends React.Component {
  state = {
    messages :[]
  }

  componentDidMount(){
    Firebase.shared.on(message => 
      this.setState(previousState => ({
        messages:GiftedChat.append(previousState.messages,message)
      }))
      )
  }

  get user() {
    return {
      name:this.props.route.params.name,
      _id:Firebase.shared.uid
    }
  }
  render(){
    return (
      <GiftedChat
      
      messages= {this.state.messages}
      user={this.user}
      onSend={Firebase.shared.send}
      
      /> 

    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
