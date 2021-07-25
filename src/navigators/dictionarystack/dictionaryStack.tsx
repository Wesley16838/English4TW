import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import dictionaryPage from "./../../containers/dictionaryPage/dictionarypage";
import savedwordPage from "./../../containers/savedwordPage/savedwordpage";
import wordRecommandPage from "./../../containers/wordrecommandPage/wordrecommand";
import wordComparePage from "./../../containers/wordcomparePage/wordcompare"
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
        name={"savedword"}
        component={savedwordPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
      />
      <dictionaryStack.Screen
        name={"wordrecommandPage"}
        component={wordRecommandPage}
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
