import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../assets/colors/colors';
import images from '../../../../assets/images/images';
import styles from './style';
import icons from '../../../../assets/icons/icons';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import Button from '../../../../components/Button/Button';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import {Rating} from 'react-native-rating-element';
import {showDanger} from '../../../../../Utils/FlashMessage';
import Config from '../../../../config/config';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {useTranslation} from 'react-i18next';

const AddReviewScreen = ({route}) => {
  const {t} = useTranslation();
  let name = route?.params?.bookingData?.salonId?.businessName;
  let Id = route?.params?.bookingData?.salonId?.businessName;
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [filePath, setFilePath] = useState();
  const [filePath1, setFilePath1] = useState();
  const [filePath2, setFilePath2] = useState();
  const [imageCounter, setImageCounter] = useState(0);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      if (imageCounter === 0) {
        setFilePath(response);
      } else if (imageCounter === 1) {
        setFilePath1(response);
      } else if (imageCounter === 2) {
        setFilePath2(response);
      }
      setImageCounter(imageCounter + 1);
    });
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert('this sis camera issue: ', response.errorMessage);
          return;
        }
        if (imageCounter === 0) {
          setFilePath(response);
        } else if (imageCounter === 1) {
          setFilePath1(response);
        } else if (imageCounter === 2) {
          setFilePath2(response);
        }
        setImageCounter(imageCounter + 1);
      });
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const validateData = () => {
    if (!filePath) {
      showDanger(t('uploadiamge'));
    } else if (review === '') {
      showDanger(t('enterReviewDetails'));
    } else if (rating === 0) {
      showDanger(t('rate'));
    } else {
      setLoading(true);
      var FormData = require('form-data');
      var data = new FormData();
      data.append('salonId', Id);
      data.append('review', review);
      data.append('rating', rating);
      {
        filePath
          ? data.append('review-images', {
              uri: filePath.assets[0].uri,
              type: filePath.assets[0].type,
              name: filePath.assets[0].fileName,
            })
          : null;
      }
      {
        filePath1
          ? data.append('review-images', {
              uri: filePath1.assets[0].uri,
              type: filePath1.assets[0].type,
              name: filePath1.assets[0].fileName,
            })
          : null;
      }
      {
        filePath2
          ? data.append('review-images', {
              uri: filePath2.assets[0].uri,
              type: filePath2.assets[0].type,
              name: filePath2.assets[0].fileName,
            })
          : null;
      }

      var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${Config.baseUrl}addSalonReview`,
        headers: {
          Authorization: `Bearer ${Config.token}`,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          let res = response.data;
          if (res.success) {
            setLoading(false);
            navigation.replace('DISCOVER_SCREEN');
          }
        })
        .catch(function (error) {
          setLoading(false);
        });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.searchBg}></View>
      <View style={styles.reviewContainer}>
        <View style={styles.iconBg}>
          <Image style={styles.icon} source={images.manIcon} />
        </View>
        <SimpleText text={name ? name : 'Null'} color={colors.black} />
      </View>

      <Rating
        rated={rating}
        ratingBackgroundColor="##d4d4d4"
        totalCount={5}
        size={wp(8)}
        marginBetweenRatingIcon={wp(3)}
        onIconTap={position => setRating(position)}
        direction="row"
        type="custom"
        selectedIconImage={icons.star}
        emptyIconImage={icons.emptyStar}
      />

      <View style={styles.textArea}>
        <TextInput
          backgroundColor={colors.secondary}
          style={styles.input}
          numberOfLines={3}
          value={review}
          onChangeText={setReview}
          placeholder="Describe salon rating..."
          selectionColor={colors.black}
          placeholderTextColor={colors.grey}
          multiline
        />
      </View>
      <View style={styles.images}>
        <View style={styles.sliderImgBg}>
          {filePath ? (
            <Image
              style={styles.sliderImg}
              source={{uri: filePath?.assets[0]?.uri}}
              resizeMode="contain"
            />
          ) : (
            <Image style={styles.sliderImg} source={images.manIcon} />
          )}
        </View>

        {filePath1 ? (
          <View style={styles.sliderImgBg}>
            <Image
              style={styles.sliderImg}
              source={{uri: filePath1?.assets[0]?.uri}}
              resizeMode="contain"
            />
          </View>
        ) : null}

        {filePath2 ? (
          <View style={styles.sliderImgBg}>
            <Image
              style={styles.sliderImg}
              source={{uri: filePath2?.assets[0]?.uri}}
              resizeMode="contain"
            />
          </View>
        ) : null}
      </View>

      {imageCounter < 3 ? (
        <View style={styles.reviewContainer}>
          <TouchableOpacity
            style={styles.cameraBg}
            onPress={() => {
              toggleModal();
            }}>
            <Image
              style={styles.camera}
              source={icons.camera}
              tintColor={colors.red}
            />
          </TouchableOpacity>
          <SmallTitle title="Add photo" />
        </View>
      ) : null}

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button
          buttonText={t('post')}
          marginTop={hp(2)}
          onPress={() => {
            validateData();
          }}
        />
      )}
      {isModalVisible && (
        <ImagePIckerModel
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
      )}
    </ScrollView>
  );
};
export default AddReviewScreen;
