import React, { Component } from "react";
import { Constants } from "expo";
import { StyleSheet, View, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Container,
  Header,
  Body,
  Title,
  Right,
  Button,
  Content,
  Text,
  ListItem,
  List,
  Separator,
  CheckBox,
  Spinner
} from "native-base";

export default class FilterList extends Component {
  state = {
    ingredients: [],
    loading: true
  };
  componentWillMount() {
    this.setState({
      ingredients: this.props.navigation.state.params.ingredients.map(item => {
        return { name: item, checked: false };
      }),
      loading: false
    });
  }
  render() {
    const { ingredients } = this.state;
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Scegli il filtro</Title>
          </Body>
          <Right>
            <Button transparent onPress={this.apply}>
              <MaterialIcons name="done" size={25} color="white" />
            </Button>
          </Right>
        </Header>

        <Content>
          {this.state.loading ? (
            <Spinner />
          ) : (
            <FlatList
              data={this.state.ingredients || []}
              renderItem={this.renderRow}
              keyExtractor={(item, index) => String(index)}
            />
          )}
        </Content>
      </Container>
    );
  }

  renderRow = obj => {
    const { ingredients } = this.state;
    const { item } = obj;
    return (
      <ListItem>
        <CheckBox
          checked={item.checked}
          onPress={() => {
            this.setState({
              ingredients: ingredients.map(
                cur =>
                  cur.name === item.name
                    ? { ...cur, checked: !cur.checked }
                    : cur
              )
            });
          }}
        />
        <Body>
          <Text>{item.name}</Text>
        </Body>
      </ListItem>
    );
  };

  apply = () => {
    const { ingredients } = this.state;
    this.props.navigation.state.params.onDone(ingredients);
  };
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  }
});
