import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";
import { Card, CardItem, Text, H2, H3 } from "native-base";

const PLACEHOLDER_IMAGE =
  "http://essentielapiculture.fr/wp-content/themes/circolare/images/placeholder.gif";

export default class CardElement extends Component {
  render() {
    const { item } = this.props;
    const img = item.image || PLACEHOLDER_IMAGE;
    return (
      <Card style={styles.container}>
        <CardItem cardBody button onPress={this._press} />
        <CardItem button onPress={this._press}>
          <View style={styles.description}>
            <H2>{item.name}</H2>
            <Text>{item.info}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={{ uri: img }} style={styles.image} />
          </View>
        </CardItem>
        <CardItem style={styles.description} button onPress={this._press}>
          <H3>{item.price} €</H3>
        </CardItem>
      </Card>
    );
  }

  _press = () => {
    this.props.onPress(this.props.item.id);
  };
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  image: {
    height: 100,
    width: 200,
    flex: 1
  },
  imageContainer: {
    alignSelf: "flex-end",
    flex: 1
  },
  description: {
    flexDirection: "column",
    alignItems: "flex-start",
    flex: 1
  }
});
