import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Container,Form,Item,Input,Label,Button} from 'native-base'

export default class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:''
    }
  }
  render(){
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label> User Name </Label>
          </Item>
          <Input autoCorrect = {false}
          autoCapitalize="none"
          onChangeText = {name => this.setState({name:name})}
          />
          <Button
          style={{marginTop:10}}
          full
          rounded
          success
          onPress={()=> {
            this.props.navigation.navigate("Chat",{
              name:this.state.name
            })
          }}
          >
            <Text style={{color:"white"}} >Chat</Text>
          </Button>
        </Form>
      </Container>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding:10
  },
});
