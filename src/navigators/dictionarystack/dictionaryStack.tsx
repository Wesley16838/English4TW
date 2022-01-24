import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import dictionaryPage from "./../../pages/dictionaryPage/dictionarypage";
import savedwordPage from "./../../pages/savedwordPage/savedwordpage";
import wordDetailPage from "./../../pages/wordDetailPage/wordDetailPage";
import wordComparePage from "./../../pages/wordcomparePage/wordcompare";
const dictionaryStack = createStackNavigator();

const dictionaryStackNavigator = () => {
  return (
    <dictionaryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="dictionary"
    >
      <dictionaryStack.Screen
        name={"dictionary"}
        component={dictionaryPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
      />
      <dictionaryStack.Screen
        name={"savedwordPage"}
        component={savedwordPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
      />
      <dictionaryStack.Screen
        name={"wordDetailPage"}
        component={wordDetailPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
        initialParams={{ word: "" }}
      />
      <dictionaryStack.Screen
        name={"wordcomparePage"}
        component={wordComparePage}
        options={{ animationEnabled: false, gestureEnabled: false }}
        initialParams={{ first: "", second: "" }}
      />
    </dictionaryStack.Navigator>
  );
};

export default dictionaryStackNavigator;
