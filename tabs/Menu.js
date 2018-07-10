import React, { Component } from "react";
import { Constants } from "expo";
import { StyleSheet } from "react-native";
import { Container, Header, Body, Title, Content, Text } from "native-base";

export default class Menu extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Body>
            <Title>Menu</Title>
          </Body>
        </Header>

        <Content>
          <Text> Menu </Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  }
});
