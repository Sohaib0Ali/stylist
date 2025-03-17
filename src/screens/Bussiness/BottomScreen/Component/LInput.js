import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../../../../BusinessUtills/assets/colors/colors'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';
import { scale } from 'react-native-size-matters';
const LInput = ({
    textConinerstyle,
    multiline,
    title,
    onChangeText,
    placeholder,
    keyboardType,
    height,
    value,
    isDisable,
    language,
    direction
}) => {
    return (
        <View>
            {direction === 'RTL' ? (
                <View style={[styles.container]}>
                    <Text style={styles.languageText}>
                        {language}
                    </Text>
                    <View style={styles.leftContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <TextInput
                            style={{ ...styles.input, direction: 'rtl' }}
                            textAlign="right"
                            value={value}
                            onChangeText={onChangeText}
                            placeholder={placeholder}
                            selectionColor={colors.black}
                            placeholderTextColor={colors.grey}
                            keyboardType={keyboardType}
                        />
                    </View>
                </View>
            ) :
                (<View style={[styles.container, textConinerstyle]}>
                    <View style={styles.leftContainer}>
                        {title ?
                            <Text style={{ ...styles.title, alignSelf: 'flex-start' }}>
                                {title}
                            </Text>
                            :
                            null
                        }
                        <TextInput
                            style={[styles.input, height ? { height: hp(16), textAlignVertical: 'top', paddingTop: hp(1) } : null]}
                            multiline={multiline ? multiline : false}
                            value={value}
                            editable={isDisable ? false : true}
                            onChangeText={onChangeText}
                            placeholder={placeholder}
                            selectionColor={colors.black}
                            placeholderTextColor={colors.grey}
                            keyboardType={keyboardType}
                        />
                    </View>
                    <Text style={styles.languageText}>
                        {language}
                    </Text>
                </View>)}
        </View>
    )
}

export default LInput

const styles = StyleSheet.create({
    container: {
        borderColor: colors.subHeading,
        borderWidth: scale(0.7),
        marginBottom: hp(1),
        borderColor: colors.grey,
        borderRadius: wp(2),
        paddingHorizontal: wp(3),
        backgroundColor: "transparent",
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
    },
    title: {
        color: colors.grey,
        fontFamily: fonts.medium,
        fontSize: 12,
        // marginTop: wp(2),
        alignSelf: 'flex-end',
    },
    input: {
        backgroundColor: "transparent",
        paddingTop: 0,
        fontFamily: fonts.bold,
        height: Platform.OS == 'ios' ? hp(4) : hp(5.5),
        fontSize:16,
        // fontSize:wp(4),
        color: colors.black,
        selectionColor: colors.black,
        fontFamily: fonts.regular,
    },
    languageText: {
        color: "#848286",
        fontSize: 14,
        fontWeight: "500",
        alignSelf: 'center'
    }
})