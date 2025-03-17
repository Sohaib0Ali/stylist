//================================ React Native Imported Files ======================================//
import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styles from './style';
import StylistPortfolio from './AddPortfolioPhotos';
import {scale} from 'react-native-size-matters';
import {Swipeable} from 'react-native-gesture-handler';
import CustomeLoader from '../../../../BusinessUtills/components/Business Components/Loader/CustomeLoader';

const PortfolioScreen = ({data}) => {
  const [edit, setEdit] = useState(false);

  return (
    <>
      <Swipeable containerStyle={{height: scale(400)}}>
        {edit === false && (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              style={{fontSize: 22, fontWeight: '600', marginLeft: scale(20)}}>
              Portfolio
            </Text>
            <TouchableOpacity
              onPress={() => {
                setEdit(!edit);
              }}>
              <Text
                style={{
                  fontSize: 17,
                  marginRight: scale(20),
                  color: '#57429D',
                }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {data?.portfolio?.length > 0 && edit === false ? (
          <View style={{paddingHorizontal: wp('4%')}}>
            <View style={styles.portfolioImgBg}>
              <Image
                style={styles.portfolioImg}
                source={{uri: data?.portfolio[0]}}
              />
            </View>
            <View style={styles.slider} key="1">
              <View style={styles.sliderImgBg}>
                <Image
                  style={styles.sliderImg}
                  source={{uri: data?.portfolio[1]}}
                />
              </View>
              <View style={styles.sliderImgBg}>
                <Image
                  style={styles.sliderImg}
                  source={{uri: data?.portfolio[2]}}
                />
              </View>
            </View>
          </View>
        ) : (
          edit === true && <StylistPortfolio stylistId={data?._id} />
        )}
      </Swipeable>
    </>
  );
};

export default PortfolioScreen;
