import React, { useEffect } from "react";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider, useDispatch } from "react-redux";
import { QueryClient, QueryClientProvider } from 'react-query'
import { DEVICE_WIDTH } from "./src/pages/splashpage";
import store from "./src/store";
import Icon from "./src/components/Icon/Icon";
import Navigator from "./src/navigators";
import Images from "./src/assets/images";
import { Colors } from "./src/styles"
import Layout from "./src/components/Layout";

const Tab = createBottomTabNavigator();

const queryClient = new QueryClient()

export default function App() {
  console.log('APP')
  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    const hideOnScreens = [
      "orderhistoryPage",
      "subscriptPage",
      "personalprofilePage",
      "subscriptPage",
      "newnotepage",
      "notecontentpage",
      "sentenceAnalysisPage",
      "wordcomparePage",
      "sentenceExamplesPage",
      "wordDetailPage",
      "loginPage",
      "createaccountPage",
      "resetpasswordPage",
      "reviewPage",
      "privacypolicyPage"
    ];
    if (
      (route.name === "首頁" && routeName === undefined) ||
      (routeName && hideOnScreens.indexOf(routeName) > -1)
    )
      return false;
    return true;
  };

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
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
                    activeTintColor: Colors.primary,
                    inactiveTintColor: Colors.gray_4,
                    labelPosition: "below-icon",
                    style: {
                      backgroundColor: Colors.bottom_tab_bar,
                      borderTopWidth: 0,
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                      position: "absolute",
                      bottom: 0,
                      zIndex: 8,
                      width: DEVICE_WIDTH,
                      shadowColor: Colors.black,
                      shadowOffset: { width: 0, height: -2 },
                      shadowOpacity: 0.1,
                      shadowRadius: 3,
                      elevation: 5,
                    },
                    tabStyle: {
                      position: "relative",
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
        </Layout>
      </QueryClientProvider>
    </Provider>
  );
}
