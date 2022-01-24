import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import settingPage from "./../../pages/settingPage/settingpage";
import loginPage from "./../../pages/loginPage/loginpage";
import createaccountPage from "./../../pages/createaccountPage/createaccountpage";
import resetpasswordPage from "./../../pages/resetpasswordPage/resetpasswordPage";
import ReviewPage from "./../../pages/reviewPage/reviewpage";
import subscriptPage from "./../../pages/subscriptPage/subscriptpage";
import orderhistoryPage from "./../../pages/orderhistoryPage/orderhistorypage";
import personalprofilePage from "./../../pages/personalprofilePage/personalprofilepage";
import PrivacyPolicyPage from "../../pages/privacypolicyPage/privacypolicyPage";
const settingStack = createStackNavigator();

const settingStackNavigator = () => {
  return (
    <settingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="settingPage"
    >
      <settingStack.Screen
        name={"settingPage"}
        component={settingPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
      />
      <settingStack.Screen
        name={"loginPage"}
        component={loginPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
      />
      <settingStack.Screen
        name={"createaccountPage"}
        component={createaccountPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
        initialParams={{ title: "創建帳戶" }}
      />
      <settingStack.Screen
        name={"resetpasswordPage"}
        component={resetpasswordPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
        initialParams={{ title: "重設密碼" }}
      />
      <settingStack.Screen
        name={"reviewPage"}
        component={ReviewPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
        initialParams={{ title: "意見回饋" }}
      />
      <settingStack.Screen
        name={"subscriptPage"}
        component={subscriptPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
        initialParams={{ title: "進階訂閱" }}
      />
      <settingStack.Screen
        name={"orderhistoryPage"}
        component={orderhistoryPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
        initialParams={{ title: "訂單記錄" }}
      />
      <settingStack.Screen
        name={"personalprofilePage"}
        component={personalprofilePage}
        options={{ animationEnabled: false, gestureEnabled: false }}
        initialParams={{ title: "個人資訊" }}
      />
      <settingStack.Screen
        name={"PrivacyPolicyPage"}
        component={PrivacyPolicyPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
        initialParams={{ title: "隱私權與使用條款" }}
      />
    </settingStack.Navigator>
  );
};

export default settingStackNavigator;
