import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import homePage from "../../pages/homePage/homePage";
import sentenceAnalysisPage from "../../pages/sentenceAnalysisPage/sentenceAnalysisPage";
import wordComparePage from "./../../pages/wordcomparePage/wordcompare";
import wordDetailPage from "./../../pages/wordDetailPage/wordDetailPage";
import sentenceExamplesPage from "../../pages/sentenceExamplesPage/sentenceExamplesPage";
import splashPage from "./../../pages/splashpage";
const homeStack = createStackNavigator();
const forFade = ({ current }: { current: any }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
const homeStackNavigator = () => {
  return (
    <homeStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      initialRouteName="splashPage"
    >
      <homeStack.Screen
        name={"splashPage"}
        component={splashPage}
        options={{
          gestureEnabled: false,
        }}
      />
      <homeStack.Screen
        name={"homePage"}
        component={homePage}
        options={{ animationEnabled: false, gestureEnabled: false }}
      />
      <homeStack.Screen
        name={"sentenceAnalysisPage"}
        component={sentenceAnalysisPage}
        options={{ cardStyleInterpolator: forFade, gestureEnabled: false }}
      />
      <homeStack.Screen
        name={"wordcomparePage"}
        component={wordComparePage}
        options={{ cardStyleInterpolator: forFade, gestureEnabled: false }}
        initialParams={{ first: "", second: "" }}
      />
      <homeStack.Screen
        name={"sentenceExamplesPage"}
        component={sentenceExamplesPage}
        options={{ cardStyleInterpolator: forFade, gestureEnabled: false }}
        initialParams={{ sentence: "" }}
      />
      <homeStack.Screen
        name={"wordDetailPage"}
        component={wordDetailPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
        initialParams={{ word: "" }}
      />
    </homeStack.Navigator>
  );
};

export default homeStackNavigator;
