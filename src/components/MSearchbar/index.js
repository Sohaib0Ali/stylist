import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import colors from '../../assets/colors/colors';
import images from '../../assets/images/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MSearchbar = ({onChangeText, value, placeholder, onclose}) => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignSelf: 'baseline'}}>
        <Image style={styles.search} source={images.Search} />
        <TextInput
          onChangeText={onChangeText}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.grey2}
          style={styles.textstyle}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          onclose();
        }}>
        <Image style={[styles.close]} source={images.close} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white2,
    height: 45,
    borderRadius: 40,
    width: '85%',
    alignSelf: 'center',
  },
  textstyle: {
    backgroundColor: colors.white2,
    width: '72%',
    height: 40,
    paddingLeft: 5,
    fontSize: 15,
    color: colors.black,
    alignSelf: 'center',
  },
  search: {
    height: wp(5),
    width: hp(5),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  close: {
    height: wp(5),
    width: hp(5),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginRight: 5,
  },
});

export default MSearchbar;
