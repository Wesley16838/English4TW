import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import homePage from "./../../containers/homePage/homepage";
import wordAnalysisPage from "./../../containers/wordanalysisPage/wordanalysis";
import wordComparePage from "./../../containers/wordcomparePage/wordcompare";
import wordRecommandPage from "./../../containers/wordrecommandPage/wordrecommand";
import sentenceAnalysisPage from "./../../containers/sentenceanalysisPage/sentenceanalysis";
import splashPage from "./../../containers/splashpage";
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
        gesturesEnabled: false,
      }}
      initialRouteParams="homePage"
    >
      {/* <homeStack.Screen
        name={"splashPage"}
        component={splashPage}
        options={{
          gestureEnabled: false,
        }}
      /> */}
      <homeStack.Screen
        name={"homePage"}
        component={homePage}
        options={{ animationEnabled: false, gestureEnabled: false }}
      />
      <homeStack.Screen
        name={"wordanalysisPage"}
        component={wordAnalysisPage}
        options={{ cardStyleInterpolator: forFade, gestureEnabled: false }}
      />
      <homeStack.Screen
        name={"wordcomparePage"}
        component={wordComparePage}
        options={{ cardStyleInterpolator: forFade, gestureEnabled: false }}
        initialParams={{ first: "", second: "" }}
      />
      <homeStack.Screen
        name={"sentenceanalysisPage"}
        component={sentenceAnalysisPage}
        options={{ cardStyleInterpolator: forFade, gestureEnabled: false }}
        initialParams={{ sentence: "" }}
      />
      <homeStack.Screen
        name={"wordrecommandPage"}
        component={wordRecommandPage}
        options={{ animationEnabled: false, gestureEnabled: false }}
        initialParams={{ word: "" }}
      />
    </homeStack.Navigator>
  );
};

export default homeStackNavigator;
