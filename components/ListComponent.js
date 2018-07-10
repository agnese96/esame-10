import React, { Component } from "react";
import { Constants } from "expo";
import { StyleSheet, FlatList } from "react-native";
import { Content, Text, Spinner } from "native-base";

import CardComponent from "./CardComponent";

export default class ListComponent extends Component {
  render() {
    console.log(this.props);
    return (
      <Content>
        {this.props.loading ? (
          <Spinner color="blue" />
        ) : (
          <FlatList
            data={this.props.data}
            renderItem={obj => (
              <CardComponent item={obj.item} onPress={this.props.onDetails} />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight
  }
});
