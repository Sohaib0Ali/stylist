import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styles from './style';
import images from '../../../../../assets/images/images';
import SmallText from '../../../../../components/SmallText/SmallText';
import SemiMediumTitle from '../../../../../components/Semi Medium Title';
import SmallTitle from '../../../../../components/SmallTitle/SmallTitle';
import Button from '../../../../../components/Button/Button';
import colors from '../../../../../assets/colors/colors';
import DownIcon from '../../../../../assets/icons/downIcon.svg';

export default function TipScreen({img, navigation}) {
  const [checked, setChecked] = useState(1);
  const [amount, setAmount] = useState('$10');

  return (
    <View style={{flex: 1, backgroundColor: colors.secondary}}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <View style={styles.toggle} />

          <SemiMediumTitle
            title={t('PayTipforMaster')}
            marginTop={hp(4)}
            marginBottom={hp(2)}
          />

          <View style={styles.rowContainer}>
            <View style={styles.imgTextContainer}>
              <View style={styles.imgBg}>
                {img ? (
                  <Image style={styles.img} source={img} resizeMode="contain" />
                ) : (
                  <Image
                    style={styles.manIcon}
                    source={images.manIcon}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={styles.catNameBg}>
                <View>
                  <SmallText text="Top master" alignSelf="flex-start" />
                  <SemiMediumTitle title="Cody Fisher" />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.checkBoxContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setChecked(1), setShow(false);
              }}
              style={styles.checkTextBg}>
              <View
                style={
                  checked === 1 ? styles.checkBoxSelected : styles.checkBox
                }
              />
              <SmallText text={t('yes')} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setChecked(2), setShow(true);
              }}
              style={styles.checkTextBg}>
              <View
                style={
                  checked === 2 ? styles.checkBoxSelected : styles.checkBox
                }
              />
              <SmallText text={t('no')} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.pickerContainer}
            activeOpacity={0.7}
            // onPress={onPress}
          >
            <View style={styles.leftContainer}>
              <SmallText text="amount" alignSelf="flex-start" />
              <View style={styles.row}>
                <View style={styles.iconTextBg}>
                  <SmallTitle
                    title="USD"
                    alignSelf="flex-start"
                    marginRight={wp(1)}
                  />
                  <DownIcon
                    width={wp(3)}
                    height={wp(3)}
                    style={{marginRight: wp(3)}}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  selectionColor={colors.black}
                  placeholderTextColor={colors.black}
                  value={amount}
                  onChangText={amount => setAmount(amount)}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </TouchableOpacity>

          <Button
            marginTop={hp(3)}
            buttonText={t('pay')}
            onPress={() => navigation.navigate('PAYMENT_METHOD_SCREEN')}
          />
        </View>
      </ScrollView>
    </View>
  );
}
