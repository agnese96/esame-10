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
  Input,
  Right,
  Button,
  Icon
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation";

const REMOTE_URL = "http://www.dmi.unict.it/~calanducci/LAP2/food.json";

import ListComponent from "../components/ListComponent";
import FilterList from "../screens/FilterList";

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
          <Right>
            <Button transparent onPress={this._filter}>
              <MaterialIcons name="filter-list" size={25} color="white" />
            </Button>
          </Right>
        </Header>

        <Content>
          <Item rounded style={styles.searchBar}>
            <Input placeholder="Cerca" onChangeText={this._search} />
          </Item>
          <ListComponent data={list} loading={this.state.loading} />
        </Content>
      </Container>
    );
  }
  flatten = (arr, prop) =>
    arr.reduce(
      (a, b) => a.concat(Array.isArray(b) ? flatten(b[prop]) : b[prop]),
      []
    );

  getData() {
    fetch(REMOTE_URL).then(response =>
      response
        .json()
        .then(res => {
          this.setState({ list: res.data, loading: false });
          const ingredients = this.flatten(this.state.list, "ingredients");
          this.setState({ ingredients });
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false });
        })
    );
  }
  _search = text => {
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
  _filter = () => {
    const { ingredients } = this.state;
    this.props.navigation.navigate("FilterList", {
      ingredients,
      onDone: this._applyFilter
    });
  };
  _applyFilter = ingredients => {
    let filteredList = [];
    ingredients.map(ingredient => {
      if (ingredient.checked)
        filteredList = [
          ...filteredList,
          ...this.state.list.filter(item =>
            item.ingredients.includes(ingredient.name)
          )
        ];
    });
    console.log(filteredList);
    if (filteredList.list.length)
      this.setState({
        filteredList
      });
    else
      this.setState({
        filteredList: null
      });
    console.log(ingredients);
    this.props.navigation.navigate("Home");
  };
}

export default createStackNavigator(
  {
    Home: {
      screen: Menu
    },
    FilterList: {
      screen: FilterList
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
