import React from "react";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Provider } from "react-redux";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import store from "./src/store";
import Icon from "./src/components/icon/icon";
import Navigator from "./src/navigators";
import Images from "./src/assets/images";
import theme from "./src/utilities/theme.style";

const Tab = createBottomTabNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const DEVICE_WIDTH = Dimensions.get("window").width;
  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    console.log("routeName,", routeName);
    const hideOnScreens = ['newnotepage', 'notecontentpage', 'wordanalysisPage', 'wordcomparePage', 'sentenceanalysisPage', 'wordrecommandPage', 'loginPage', 'createaccountPage', 'resetpasswordPage', 'reviewPage'];
    if ((route.name === '首頁' && routeName === undefined) || routeName && hideOnScreens.indexOf(routeName) > -1) return false;
    return true;
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={(route: any) => ({
              tabBarIcon: ({
                focused,
                color,
                size,
              }: {
                focused: any;
                color: any;
                size: any;
              }) => {
                let iconName;
                switch (route.route.name) {
                  case "首頁":
                    iconName = focused
                      ? Images.tabBarItems.home_focus
                      : Images.tabBarItems.home;
                    break;
                  case "字典":
                    iconName = focused
                      ? Images.tabBarItems.dictionary_focus
                      : Images.tabBarItems.dictionary;
                    break;
                  case "筆記":
                    iconName = focused
                      ? Images.tabBarItems.note_focus
                      : Images.tabBarItems.note;
                    break;
                  case "設定":
                    iconName = focused
                      ? Images.tabBarItems.setting_focus
                      : Images.tabBarItems.setting;
                    break;
                }
                return <Icon name={iconName} size={size} color={color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: theme.PRIMARY_COLOR_DEFAULT,
              inactiveTintColor: "gray",
              showIcon: true,
              labelPosition: "below-icon",
              style: {
                backgroundColor: "#FFFDF5",
                borderTopWidth: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                position: "absolute",
                bottom: 0,
                zIndex: 8,
                width: DEVICE_WIDTH,
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 5,
              },
              tabStyle: {
                position: "relative",
                marginBottom: 5,
              },
            }}
          >
            <Tab.Screen
              name="首頁"
              component={Navigator.homeStackNavigator}
              options={({ route }: { route: any }) => ({
                tabBarVisible: getTabBarVisibility(route),
              })}
            />
            <Tab.Screen
              name="字典"
              component={Navigator.dictionaryStackNavigator}
              options={({ route }: { route: any }) => ({
                tabBarVisible: getTabBarVisibility(route),
              })}
            />
            <Tab.Screen
              name="筆記"
              component={Navigator.noteStackNavigator}
              options={({ route }: { route: any }) => ({
                tabBarVisible: getTabBarVisibility(route),
              })}
            />
            <Tab.Screen
              name="設定"
              component={Navigator.settingStackNavigator}
              options={({ route }: { route: any }) => ({
                tabBarVisible: getTabBarVisibility(route),
              })}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});
