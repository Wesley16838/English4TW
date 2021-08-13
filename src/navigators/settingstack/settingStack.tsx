import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import settingPage from "./../../containers/settingPage/settingpage";
import loginPage from "./../../containers/loginPage/loginpage";
import createaccountPage from "./../../containers/createaccountPage/createaccountpage"
import resetpasswordPage from "./../../containers/resetpasswordPage/resetpasswordPage"
import ReviewPage from "./../../containers/reviewPage/reviewpage"
import subscriptPage from "./../../containers/subscriptPage/subscriptpage"
import personalprofilePage from "./../../containers/personalprofilePage/personalprofilepage"
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
      <settingStack.Screen name={"subscriptPage"} component={subscriptPage} options={{ animationEnabled: false, gestureEnabled: false }} initialParams={{ title: "進階訂閱" }} />
      <settingStack.Screen name={"personalprofilePage"} component={personalprofilePage} options={{ animationEnabled: false, gestureEnabled: false }} initialParams={{ title: "個人資訊" }} />
    </settingStack.Navigator>
  );
};

export default settingStackNavigator;
