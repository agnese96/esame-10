import React, { Component } from "react";
import { Constants } from "expo";
import { StyleSheet } from "react-native";
import { Container, Header, Body, Title, Content, Text } from "native-base";
import { createStackNavigator } from "react-navigation";

const REMOTE_URL = "http://www.dmi.unict.it/~calanducci/LAP2/food.json";

import ListComponent from "../components/ListComponent";

class Menu extends Component {
  state = {
    list: [],
    loading: true
  };
  componentWillMount() {
    this.getData();
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Menu</Title>
          </Body>
        </Header>

        <Content>
          <ListComponent data={this.state.list} loading={this.state.loading} />
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
  }
});
