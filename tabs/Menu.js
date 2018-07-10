import React, { Component } from "react";
import { Constants } from "expo";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Text,
  Item,
  Input
} from "native-base";
import { createStackNavigator } from "react-navigation";

const REMOTE_URL = "http://www.dmi.unict.it/~calanducci/LAP2/food.json";

import ListComponent from "../components/ListComponent";

class Menu extends Component {
  state = {
    list: [],
    loading: true,
    filteredList: null
  };
  componentWillMount() {
    this.getData();
  }
  render() {
    const list = this.state.filteredList || this.state.list;
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Menu</Title>
          </Body>
        </Header>

        <Content>
          <Item rounded style={styles.searchBar}>
            <Input placeholder="Cerca" onChangeText={this._filter} />
          </Item>
          <ListComponent data={list} loading={this.state.loading} />
        </Content>
      </Container>
    );
  }
  getData() {
    fetch(REMOTE_URL).then(response =>
      response
        .json()
        .then(res => {
          this.setState({ list: res.data, loading: false });
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false });
        })
    );
  }
  _filter = text => {
    if (text.length <= 2) {
      this.setState({ filteredList: null });
      return;
    }
    const filteredList = this.state.list.filter(item => {
      return item.name.toLowerCase().includes(text);
    });
    this.setState({
      filteredList
    });
  };
}

export default createStackNavigator(
  {
    Home: {
      screen: Menu
    }
    /*Details: {
      screen: Details
    }*/
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  },
  searchBar: {
    backgroundColor: "white",
    marginTop: 5
  }
});
