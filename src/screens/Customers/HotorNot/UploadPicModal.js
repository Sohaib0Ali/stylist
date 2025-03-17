import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Backnav from '../../../components/BackNav/backnav';
import fonts from '../../../assets/fonts/fonts';
import images from '../../../assets/images/images';
import ImagePIckerModel from '../../Bussiness/BottomScreen/Component/ImagePIckerModel';
import ImageCropPicker from 'react-native-image-crop-picker';

const {width, height} = Dimensions.get('screen');

const UploadPicModal = () => {
  const [picker, setOpenPicker] = useState(false);
  const toggleModal = () => {
    setOpenPicker(!picker);
  };

  const chooseFile = async type => {
    try {
      let options = {
        mediaType: type,
        cropping: true,
        cropperCircleOverlay: true,
      };
      const image = await ImageCropPicker.openPicker(options);
      if (image && image.path) {
      }
    } catch (error) {}
  };

  const captureImage = async type => {
    try {
      let options = {
        mediaType: type,
        cropping: true,
        cropperCircleOverlay: true,
      };

      const image = await ImageCropPicker.openCamera(options);
      if (image && image.path) {
      }
    } catch (error) {}
  };
  return (
    <>
      <SafeAreaView style={styles.safeContainer}>
        <Backnav />
        <Text style={styles.topText}>
          Upload Your Picture For Hot Or Not Feature...
        </Text>
        <Text style={styles.bottomText}>
          Check out our hot or not feature and vote on who's HOT. If you think
          you're hot enough, upload a picture to
        </Text>
        <Image source={images.smilyFace} style={styles.smily} />
        <TouchableOpacity style={styles.btnView} onPress={() => toggleModal()}>
          <Text style={styles.btnText}>Pick-up your picture</Text>
        </TouchableOpacity>
      </SafeAreaView>
      {picker && (
        <View
          style={{
            width: width,
            height: height,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ImagePIckerModel
            modalView={{
              marginTop: (height - 150) / 2,
            }}
            OnPressChooseImg={() => {
              toggleModal();
              chooseFile('photo');
            }}
            OnPressTakePhoto={() => {
              captureImage('photo');
              toggleModal();
            }}
            OnpressCancle={() => toggleModal()}
          />
        </View>
      )}
    </>
  );
};

export default UploadPicModal;

const styles = StyleSheet.create({
  safeContainer: {
    marginHorizontal: 20,
  },
  topText: {
    marginTop: 20,
    fontWeight: '700',
    fontSize: 20,
    width: 257,
    fontFamily: fonts.Exo2Bold,
    color: 'black',
    lineHeight: 24,
  },
  bottomText: {
    marginTop: 10,
    fontSize: 12,
    color: '#27232C',
    fontWeight: '400',
    fontFamily: fonts.Exo2Bold,
    lineHeight: 17,
  },
  smily: {
    height: 178,
    width: 214,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 75,
  },
  btnView: {
    backgroundColor: '#574291',
    width: width - 30,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  btnText: {
    color: 'white',
    fontFamily: fonts.Exo2Bold,
    fontWeight: '500',
    fontSize: 18,
  },
});
