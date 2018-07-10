import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Font } from "expo";
import { Spinner } from "native-base";
//import * as firebase from "firebase";

import Menu from "./tabs/Menu";
import Carrello from "./tabs/Carrello";

export default class Home extends Component {
  state = {
    loading: true
  };
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }
  render() {
    return this.state.loading ? <Spinner /> : <MaterialTabNavigator />;
  }
}

const MaterialTabNavigator = createMaterialBottomTabNavigator(
  {
    Menu: { screen: Menu },
    Carrello: { screen: Carrello }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "Menu":
            iconName = "restaurant-menu";
            break;
          case "Carrello":
            iconName = "shopping-cart";
            break;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <MaterialIcons name={iconName} size={25} color={tintColor} />;
      }
    }),
    initialRouteName: "Menu",
    labeled: true,
    barStyle: { backgroundColor: "#3F51B5" },
    tabBarOptions: {
      activeTintColor: "#3F51B5",
      inactiveTintColor: "gray"
    },
    shifting: true
  }
);
