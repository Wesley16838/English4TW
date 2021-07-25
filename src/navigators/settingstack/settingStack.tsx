import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import settingPage from "./../../containers/settingPage/settingpage";
import loginPage from "./../../containers/loginPage/loginpage";
import createaccountPage from "./../../containers/createaccountPage/createaccountpage"

const settingStack = createStackNavigator();

const settingStackNavigator = () => {
  return (
    <settingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="settingPage"
    >
      <settingStack.Screen name={"settingPage"} component={settingPage} options={{ animationEnabled: false, gestureEnabled: false }} />
      <settingStack.Screen name={"loginPage"} component={loginPage} options={{ animationEnabled: false, gestureEnabled: false }} />
      <settingStack.Screen name={"createaccountPage"} component={createaccountPage} options={{ animationEnabled: false, gestureEnabled: false }} />
    </settingStack.Navigator>
  );
};

export default settingStackNavigator;
