import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';
import icons from '../../assets/icons/icons';

const Input = ({
  value,
  onChangeText,
  placeholder,
  title,
  isDisable,
  keyboardType,
  direction,
  height,
  multiline,
  show,
  textContainerStyle,
}) => {
  const [secureText, setSecureText] = useState(false);

  return (
    <View>
      {direction === 'RTL' ? (
        <View style={[styles.container]}>
          {show ? (
            <TouchableOpacity
              style={styles.rightContainer}
              onPress={() => setSecureText(!secureText)}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={secureText ? icons.crossEye : icons.eye}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}

          <View style={styles.leftContainer}>
            <Text style={styles.title}>{title}</Text>
            <TextInput
              style={[styles.input, { textAlign: 'right' }]}
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder}
              selectionColor={colors.black}
              placeholderTextColor={colors.grey}
              secureTextEntry={show ? !secureText : secureText}
              keyboardType={keyboardType}
              textContentType="none"
            />
          </View>
        </View>
      ) : (
        <View style={[styles.container, textContainerStyle]}>
          <View style={styles.leftContainer}>
            {title ? (
              <Text style={{ ...styles.title, alignSelf: 'flex-start' }}>
                {title}
              </Text>
            ) : null}
            <TextInput
              style={[
                styles.input,
                height
                  ? {
                    height: hp(15),
                    textAlignVertical: 'top',
                    paddingTop: hp(1.6),
                  }
                  : null,
              ]}
              multiline={multiline ? multiline : false}
              value={value}
              editable={!isDisable}
              onChangeText={onChangeText}
              placeholder={placeholder}
              selectionColor={colors.black}
              placeholderTextColor={colors.grey}
              secureTextEntry={show ? !secureText : secureText}
              keyboardType={keyboardType}
            />
          </View>
          {show ? (
            <TouchableOpacity
              style={styles.rightContainer}
              onPress={() => setSecureText(!secureText)}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={secureText ? icons.crossEye : icons.eye}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.subHeading,
    borderWidth: wp(0.4),
    marginBottom: hp(1.5),
    borderColor: colors.grey,
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
  },
  title: {
    color: colors.grey,
    fontFamily: fonts.medium,
    fontSize: wp(3.2),
    marginTop: wp(2),
    alignSelf: 'flex-end',
  },
  input: {
    backgroundColor: 'transparent',
    paddingTop: 0,
    fontFamily: fonts.bold,
    height: Platform.OS === 'ios' ? hp(4) : hp(5.5),
    fontSize: wp(4.4),
    color: colors.black,
    fontFamily: fonts.regular,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: wp(6),
    height: hp(6),
    resizeMode: 'contain',
  },
});
