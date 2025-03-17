import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import MediumTitle from '../../../../BusinessUtills/components/MediumTitle/MediumTitle';
import SmallTitle from '../../../../BusinessUtills/components/SmallTitle/SmallTitle';
import {t} from 'i18next';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {scale} from 'react-native-size-matters';
import colors from '../../../../BusinessUtills/assets/colors/colors';

const ImagePIckerModel = ({
  OnPressTakePhoto,
  OnPressChooseImg,
  OnpressCancle,
  containerView,
  modalView,
  marginTop,
}) => {
  return (
    <View style={[styles.container, containerView]}>
      <View style={[styles.modalContainer, modalView]}>
        {/* <MediumTitle title={t('choosePhoto')} marginTop={wp(5)} textStyles={{alignSelf:"center"}} /> */}
        <TouchableOpacity
          style={[
            styles.modalButton,
            {
              borderTopLeftRadius: scale(10),
              borderTopRightRadius: scale(10),
              marginTop: marginTop,
            },
          ]}
          activeOpacity={0.6}
          onPress={OnPressTakePhoto}>
          <SmallTitle
            title={t('takePhoto')}
            alignSelf="flex-start"
            // marginTop={wp(5)}
            color={'#0A84FF'}
            width={wp(80)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.modalButton,
            {
              borderTopWidth: 0.3,
              borderBottomLeftRadius: scale(10),
              borderBottomRightRadius: scale(10),
            },
          ]}
          activeOpacity={0.6}
          onPress={OnPressChooseImg}>
          <SmallTitle
            title={t('chooseFromLibrary')}
            alignSelf="flex-start"
            // marginTop={wp(4)}
            color={'#0A84FF'}
            width={wp(80)}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.modalButton,
            {marginTop: scale(10), borderRadius: scale(15)},
          ]}
          onPress={OnpressCancle}>
          <SmallTitle
            title={t('cancel')}
            alignSelf="flex-start"
            color={'#FF453A'}
            width={wp(80)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ImagePIckerModel;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },
  modalContainer: {
    paddingHorizontal: wp(4),
    borderRadius: wp(1),
    marginHorizontal: scale(30),
    marginTop: scale(190),
  },
  modalButton: {
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: scale(45),
  },
});
