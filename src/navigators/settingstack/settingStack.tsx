import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import settingPage from "./../../containers/settingPage/settingpage";
import loginPage from "./../../containers/loginPage/loginpage";
import createaccountPage from "./../../containers/createaccountPage/createaccountpage"
import resetpasswordPage from "./../../containers/resetpasswordPage/resetpasswordPage"
import ReviewPage from "./../../containers/reviewPage/reviewpage"
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
      <settingStack.Screen name={"createaccountPage"} component={createaccountPage} options={{ animationEnabled: false, gestureEnabled: false }} initialParams={{ title: "創建帳戶" }} />
      <settingStack.Screen name={"resetpasswordPage"} component={resetpasswordPage} options={{ animationEnabled: false, gestureEnabled: false }} initialParams={{ title: "重設密碼" }} />
      <settingStack.Screen name={"reviewPage"} component={ReviewPage} options={{ animationEnabled: false, gestureEnabled: false }} initialParams={{ title: "意見回饋" }} />
    </settingStack.Navigator>
  );
};

export default settingStackNavigator;
