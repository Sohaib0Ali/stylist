import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {t} from 'i18next';
import colors from '../../../../assets/colors/colors';
import {scale, verticalScale} from 'react-native-size-matters';
import images from '../../../../BusinessUtills/assets/images/images';

const OpenmailModel = () => {
  return (
    <View style={{height: '100%', backgroundColor: 'rgba(252,252,252,0.1)'}}>
      <View
        style={{
          height: verticalScale(320),

          width: '100%',
          backgroundColor: colors.white,
          position: 'absolute',
          bottom: -10,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <View style={styles.imgBackground}>
            <Image
              source={images.Exclude}
              style={{
                height: scale(35),
                width: scale(35),
                resizeMode: 'cover',
              }}
            />
          </View>
          <Text style={styles.sheetTitile}>{t('checkyouremail')}</Text>
          <Text style={styles.sheetSubTitile}>{t('mailcodevalidation')}</Text>
        </View>
        <TouchableOpacity
          style={styles.mailBtn}
          onPress={() => {
            openMail();
          }}>
          <Text style={{fontSize: 17, fontWeight: '500', color: '#FFFFFF'}}>
            {t('openmailapp')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OpenmailModel;

const styles = StyleSheet.create({
  imgBackground: {
    height: scale(124),
    width: scale(124),
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#DDE1E6',
    justifyContent: 'center',
    borderRadius: scale(16),
  },
  sheetTitile: {
    fontSize: 22,
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: scale(15),
    color: '#000000',
  },
  sheetSubTitile: {
    fontSize: 14,
    fontWeight: '400',
    alignSelf: 'center',
    marginTop: scale(8),
    marginHorizontal: scale(52),
    textAlign: 'center',
    color: '#5E5E5F',
  },
  mailBtn: {
    height: scale(58),
    width: scale(214),
    backgroundColor: '#57429D',
    alignSelf: 'center',
    marginTop: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(16),
  },
});
