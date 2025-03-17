//================================ React Native Imported Files ======================================//

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import icons from '../../../../assets/icons/icons';
import SemiMediumTitle from '../../../../components/Semi Medium Title';
import SmallText from '../../../../components/SmallText/SmallText';
import StarFilled from '../../../../assets/icons/starFilled.svg';
import colors from '../../../../assets/colors/colors';
import {Slider} from 'react-native-elements';
import MediumTitle from '../../../../components/MediumTitle/MediumTitle';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';

const WalletScreen = () => {
  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          <View style={styles.iconBg}>
            <Image
              source={icons.hairCutter}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity style={styles.discountBg} activeOpacity={0.7}>
            <SmallTitle title={'USD'} alignSelf="center" marginRight={wp(1)} />
            <SemiMediumTitle title="15" />
          </TouchableOpacity>
        </View>
        <SemiMediumTitle title="Haircut discount" marginTop={hp(2)} />
        <SmallText
          marginBottom={hp(5)}
          text="Spend $100 and get $15 off"
          alignSelf="flex-start"
        />
        <View style={{paddingHorizontal: wp(5)}}>
          <Slider
            minimumValue={0}
            maximumValue={100}
            value={value}
            onValueChange={values => {
              setValue(values);
            }}
            thumbStyle={{
              height: wp(4),
              width: wp(4),
              backgroundColor: colors.white,
              borderWidth: wp(0.64),
              borderColor: colors.red,
            }}
            maximumTrackTintColor={colors.borderColor}
            minimumTrackTintColor={colors.red}
            thumbProps={{
              children: (
                <View
                  style={{
                    color: '#DE4C5B',
                    marginTop: -45,
                    width: wp(22),
                    alignItems: 'center',
                    position: 'absolute',
                    zIndex: 5,
                    left: wp(-9.5),
                    backgroundColor: colors.red,
                    paddingHorizontal: wp(0.5),
                    paddingVertical: wp(1),
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <SmallTitle
                      marginTop={wp(0.5)}
                      color={'white'}
                      title={'USD'}
                      alignSelf="center"
                      marginRight={wp(1)}
                    />
                    <Text style={{color: colors.white, fontSize: wp(4)}}>
                      {Math.round(value)} to go
                    </Text>
                  </View>
                  <View
                    style={{
                      height: wp(3),
                      width: wp(3),
                      position: 'absolute',
                      top: wp(6),
                      borderLeftWidth: wp(4),
                      borderRightWidth: wp(4),
                      borderTopWidth: wp(4),
                      borderLeftColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderBottomColor: '#fff',
                      borderTopColor: colors.red,
                    }}></View>
                </View>
              ),
            }}
          />
        </View>
        <View style={{flexDirection: 'row', bottom: 6, alignSelf: 'flex-end'}}>
          <SmallTitle
            title="USD"
            marginBottom={wp(0.5)}
            alignSelf="flex-end"
            marginRight={wp(1)}
          />
          <MediumTitle title="100" alignSelf="flex-end" />
        </View>
      </View>
      <View style={{...styles.itemContainer, marginTop: hp(3)}}>
        <View style={styles.iconTitleBg}>
          <View style={styles.iconBg}>
            <Image
              source={icons.hairCutter}
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <View style={{marginLeft: wp(3.5)}}>
            <SemiMediumTitle title="Free haircut" />
            <SmallText text="Every 10th haircut as a gift" />
          </View>
        </View>
        <View style={styles.pagerContainer}>
          <View style={styles.page}>
            <SmallText text="1" />
          </View>
          <View style={styles.page}>
            <SmallText text="2" />
          </View>
          <View style={styles.page}>
            <SmallText text="3" />
          </View>
          <View style={styles.page}>
            <SmallText text="4" />
          </View>
          <View style={styles.page}>
            <SmallText text="5" />
          </View>
          <View style={styles.page}>
            <SmallText text="6" />
          </View>
          <View style={styles.page1}>
            <SmallText text="7" color={colors.black} />
          </View>
          <View style={styles.page1}>
            <SmallText text="8" color={colors.black} />
          </View>
          <View style={styles.page1}>
            <SmallText text="9" color={colors.black} />
          </View>
          <StarFilled width={wp(6)} height={wp(6)} />
        </View>
      </View>
    </View>
  );
};

export default WalletScreen;
