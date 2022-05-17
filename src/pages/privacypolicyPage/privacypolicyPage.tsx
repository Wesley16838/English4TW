import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import Button from "../../components/Button/Button";
import images from "../../assets/images";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextStyle,
} from "react-native";
import { DEVICE_WIDTH } from "../splashpage";
import { Colors, Typography } from "../../styles";
import LinearGradientLayout from "../../components/LinearGradientLayout";

const PrivacyPolicyPage = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <LinearGradientLayout>
      <SafeAreaView>
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 20,
              marginBottom: 30,
            }}
          >
            <View style={{ flex: 1, alignItems: "flex-start" }}>
              <Button
                title=""
                image={images.icons.leftarrow_icon}
                customStyle={{}}
                imageSize={{ height: 20, width: 12, marginRight: 0 }}
                type=""
                onPress={() => handleBack()}
              />
            </View>

            <Text
              style={ Typography.pageTitle as TextStyle }
            >
              隱私權與使用條款
            </Text>
            <View style={{ flex: 1, alignItems: "flex-end" }} />
          </View>

          <View style={{ width: DEVICE_WIDTH - 32, alignSelf: "center", marginBottom:60 }}>
            <Text style={{ marginBottom: 25 }}>
              非常歡迎您光臨「台灣美語通網站」（以下簡稱本網站），為了讓您能夠安心使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請您詳閱下列內容：
            </Text>

            <Text
              style={ styles.listTitle }
            >
              一、隱私權保護政策的適用範圍
            </Text>
            <Text style={{ marginBottom: 25 }}>
              隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。
            </Text>

            <Text
              style={ styles.listTitle }
            >
              二、個人資料的收集、處理及利用方式
            </Text>
            <Text>
              當您洽辦本網站業務或參與本網站活動時，我們將視業務或活動性質請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料; 非經您書面同意，本網站不會將個人資料用於其他用途。
            </Text>
            <Text>
              於一般瀏覽時，伺服器會自行紀錄相關行徑，包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料紀錄等，作為我們增進網站服務的參考依據，此紀錄為內部應用，決不對外公布。
            </Text>
            <Text style={{ marginBottom: 25 }}>
              為提供精確的服務，我們會將收集的問卷調查內容進行統計及分析，分析結果之統計數據或說明文字呈現，除供內部研究外，我們會視需要公布統計數據及說明文字，但不涉及特定個人之資料。
            </Text>

            <Text
              style={ styles.listTitle }
            >
              三、資料之保護
            </Text>
            <Text >
              本網站主機均設有防火牆、防毒系統等相關的各項資訊安全設備及必要的安全防護措施，加以保護網站及您的個人資料採用嚴格的保護措施，只由經過授權的人員才能接觸您的個人資料，相關人員皆簽有保密合約，如有違反保密義務者，將會受到相關的法律處分。
            </Text>
            <Text style={{ marginBottom: 25, lineHeight: 20  }}>
              如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。
            </Text>

            <Text
              style={ styles.listTitle }
            >
              四、網站對外的相關連結
            </Text>
            <Text style={styles.listContent}>
              本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。
            </Text>
            <Text
              style={ styles.listTitle }
            >
              五、與第三人共用個人資料之政策
            </Text>
            <Text style={styles.listContent}>
              本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。
            </Text>
            <Text style={{ marginBottom: 5}}>前項但書之情形包括不限於：</Text>

            <View style={ styles.row }>
              <Text>&#8226; </Text>
              <Text style={{lineHeight: 20}}>經由您書面同意。</Text>
            </View>
            
            <View style={ styles.row }>
              <Text>&#8226; </Text>
              <Text style={styles.rowContent}>法律明文規定。</Text> 
            </View>
            <View style={ styles.row }>
              <Text>&#8226; </Text>
              <Text style={styles.rowContent}>為免除您生命、身體、自由或財產上之危險。</Text>
            </View>
            <View style={ styles.row }>
              <Text>&#8226; </Text>
              <Text style={styles.rowContent}>與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或搜集著依其揭露方式無從識別特定之當事人。</Text>
            </View>
            <View style={ styles.row }>
              <Text>&#8226; </Text>
              <Text style={styles.rowContent}>當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。</Text>
            </View>
            <View style={ styles.row }>
              <Text>&#8226; </Text>
              <Text style={styles.rowContent}>有利於您的權益。</Text>
            </View>
            <View style={{...styles.row, marginBottom: 25}}>
              <Text>&#8226; </Text>
              <Text style={styles.rowContent}>本網站委託廠商協助蒐集、處理或利用您的個人資料，將對委外廠商或個人善盡監督管理之責。</Text>
            </View>
            <Text
              style={ styles.listTitle }
            >
              六、Cookie之使用
            </Text>
            <Text style={styles.listContent}>
              為了提供您最佳的服務，本網站會在您的電腦中放置並取用我們的Cookie，若您不願接受Cookie的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕Cookie的寫入，但可能會導致網站某些功能無法正常執行。
            </Text>
            <Text
              style={ styles.listTitle }
            >
              七、個人資料之使用
            </Text>
            <View style={ styles.row }>
              <Text>&#8226; </Text>
              <Text style={styles.rowContent}>English4TW僅保留註冊時輸入的姓名與電子郵件以提供帳號註冊/登入使用。</Text> 
            </View>
            <View style={ styles.row }>
              <Text>&#8226; </Text>
              <Text style={styles.rowContent}>如您使用Facebook登入功能，透過Facebook取得之姓名與電子郵件僅供帳號註冊/登入目的使用。</Text> 
            </View>
            <View style={ styles.row }>
              <Text>&#8226; </Text>
              <Text style={styles.rowContent}>網站並無搜集或使用其他個人資料或網站使用紀錄/足跡。</Text> 
            </View>
            <View style={ styles.row }>
              <Text>&#8226; </Text>
              <Text style={{...styles.listContent, flex: 1}}>您的帳號與資料可透過帳號個人資料頁面進行刪除。</Text> 
            </View>
            <Text
              style={ styles.listTitle }
            >
              八、隱私權保護政策之修正
            </Text>
            <Text style={styles.rowContent}>
            本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradientLayout>
  );
};
const styles = StyleSheet.create({
  sectionRow: {
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    width: DEVICE_WIDTH,
    borderTopColor: Colors.primary_light,
    borderTopWidth: 1,
  },
  sectionText: {},
  version: {
    color: "rgba(60, 60, 67, 0.6)",
  },
  sectionArrow: {
    width: 7,
    height: 12,
  },
  listTitle: {
    ...Typography.base_bold, 
    marginBottom: 5
  },
  listContent: {
    marginBottom: 25,
    lineHeight: 20
  },
  row: {
    flexDirection: 'row'
  },
  rowContent: {
    lineHeight: 20, flex: 1
  }
});

export default PrivacyPolicyPage;
