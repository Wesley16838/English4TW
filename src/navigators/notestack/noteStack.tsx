import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import notePage from "./../../containers/notePage/notepage";
import newNotePage from "./../../containers/newnotePage/newnotepage";
import noteContentPage from "./../../containers/notecontentPage/notecontentpage";
const noteStack = createStackNavigator();

const noteStackNavigator = () => {
  return (
    <noteStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="notepage"
    >
      <noteStack.Screen
        name={"notepage"}
        component={notePage}
        options={{ animationEnabled: false, gestureEnabled: false }}
      />
      <noteStack.Screen
        name={"newnotepage"}
        component={newNotePage}
        options={{ animationEnabled: false, gestureEnabled: false }}
        initialParams={{ title: "" }}
      />
      <noteStack.Screen
        name={"notecontentpage"}
        component={noteContentPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
      />
    </noteStack.Navigator>
  );
};

export default noteStackNavigator;
