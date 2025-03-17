import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import icons from '../../../assets/icons/icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../../assets/colors/colors';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import MediumTitle from '../../../components/MediumTitle/MediumTitle';
import images from '../../../assets/images/images';
import {FlatList} from 'react-native';
import Button from '../../../components/Button/Button';
import {useTranslation} from 'react-i18next';

const StyleCollectionScreen = props => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const StyleName = props?.route?.params;
  const collection = props?.route?.params?.Collection;
  const navigation = useNavigation();
  const {t} = useTranslation();

  const handleItemPress = item => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };
  const renderItem = item => {
    return (
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={() => handleItemPress(item)}>
        <Image
          style={styles.profileimg}
          source={{uri: item?.item}}
          borderRadius={scale(9)}
        />
      </TouchableOpacity>
    );
  };

  const RenderModal = () => {
    return (
      <>
        {selectedItem && (
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={{
                paddingHorizontal: wp(6),
                alignSelf: 'flex-start',
                marginBottom: scale(15),
              }}
              onPress={() => setIsModalVisible(false)}>
              <Image
                style={styles.cancleIcon}
                source={images.close}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={styles.modalCard}>
              <Image
                style={styles.modalImage}
                source={{uri: selectedItem?.item}}
              />
              <View style={{height: scale(135)}}>
                <ScrollView
                  horizontal
                  style={{marginTop: scale(30)}}
                  showsHorizontalScrollIndicator={false}>
                  {collection?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.9}
                        style={{marginHorizontal: scale(8)}}
                        onPress={() =>
                          setSelectedItem({item: item, index: index})
                        }>
                        <Image
                          style={[
                            styles.modalsmallImg,
                            {
                              borderWidth:
                                index === selectedItem?.index ? 2 : 0,
                              borderColor: colors.btnColor,
                            },
                          ]}
                          source={{uri: item}}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
              <Button
                buttonText={t('Save Style in you wallet')}
                alignSelf={'center'}
                height={scale(42)}
                width={scale(240)}
                marginBottom={scale(10)}
              />
            </View>
          </View>
        )}
      </>
    );
  };
  return (
    <View style={styles.Maincontainer}>
      <TouchableOpacity
        style={{
          paddingVertical: hp('3%'),
          paddingHorizontal: wp(6),
          height: scale(70),
        }}
        onPress={() => navigation.goBack()}>
        <Image
          style={styles.backIcon}
          source={icons.backArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <MediumTitle
        title={StyleName?.StyleName}
        marginBottom={scale(10)}
        marginTop={scale(20)}
        marginLeft={scale(25)}
        fontSize={scale(24)}
        Weight={'600'}
      />

      <FlatList
        contentContainerStyle={{
          paddingBottom: hp(4),
          alignSelf: 'center',
        }}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        data={collection}
        renderItem={(item, index) => renderItem(item)}
        keyExtractor={item => item.backgroundColor}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}>
        {RenderModal()}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(145),
    height: scale(180),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginHorizontal: scale(12),
    marginVertical: scale(15),
    borderRadius: scale(9),
  },
  profileimg: {
    width: scale(145),
    height: scale(180),
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 15,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // set the background color with an alpha channel value of 0.5 for 50% opacity
  },
  Maincontainer: {
    flex: 1,
  },
  backIcon: {
    width: wp(3.5),
    height: hp(3.5),
    tintColor: colors.black,
    position: 'absolute',
    bottom: scale(0),
    left: scale(10),
    marginLeft: scale(10),
  },
  cancleIcon: {
    width: scale(25),
    height: scale(25),
    tintColor: colors.white,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: '100%',
    height: '60%',
    borderRadius: scale(20),
  },
  modalsmallImg: {
    width: scale(92),
    height: scale(89),
    borderRadius: scale(20),
  },
  modalCard: {
    width: scale(320),
    height: scale(560),
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderRadius: scale(20),
  },
});
export default StyleCollectionScreen;
