//================================ React Native Imported Files ======================================//
import { Platform, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//================================ Local Imported Files ======================================//

import colors from "../../../../BusinessUtills/assets/colors/colors";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? hp(5) : null,
    backgroundColor: colors.secondary,
    paddingHorizontal:wp(2)

  },
  body: {
    paddingBottom: Platform.OS === "ios" ? hp(5) : null,
  },
  available: {
    backgroundColor:colors.yellow, 
    justifyContent:'center',
    paddingVertical:hp(1),
    paddingHorizontal:wp(4), 
    marginLeft:wp(4),
    borderRadius:wp(10),
    marginVertical:wp(4)
  }
});

export default styles;
