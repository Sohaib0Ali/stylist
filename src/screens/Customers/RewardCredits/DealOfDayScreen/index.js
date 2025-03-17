//================================ React Native Imported Files ======================================//

import React from 'react';
import {View, FlatList, Image, ImageBackground} from 'react-native';

//================================ Local Imported Files ======================================//
import styles from './style';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import images from '../../../../assets/images/images';
import SemiTitle from '../../../../components/SemiTitle';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import SmallText from '../../../../components/SmallText/SmallText';
import SemiMediumTitle from '../../../../components/Semi Medium Title';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';
import QRCode from 'react-native-qrcode-svg';

const data = [
  {
    id: '1',
    collaboratorImg: images.woman4,
  },
  {
    id: '2',
    collaboratorImg: images.woman2,
  },
  {
    id: '3',
    collaboratorImg: images.woman3,
  },
  {
    id: '4',
    collaboratorImg: images.woman5,
  },
];

const DealOfDayScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <ImageBackground
          style={styles.imgBg}
          imageStyle={{borderRadius: wp(4)}}
          source={images.salonBg}>
          <View style={styles.qrBg}>
            <QRCode value="http://awesome.link.qr" />
          </View>
        </ImageBackground>
        <View style={styles.titleRow}>
          <SemiTitle title="Toney & Guy" />
          <View style={styles.priceBg}>
            <SimpleText text="Now" marginRight={wp(2)} />
            <SmallTitle
              title="USD"
              marginTop={wp(1.5)}
              alignSelf="center"
              marginRight={wp(1)}
            />
            <SemiMediumTitle marginTop={wp(1)} title="20" />
          </View>
        </View>
        <View style={styles.textRow}>
          <SmallText text="16th Street Mall, London WC2 5JW" />
          <View style={{flexDirection: 'row'}}>
            <SmallTitle title="USD" marginRight={wp(1)} />
            <SimpleText text="40" />
          </View>
        </View>
        <View style={styles.collaborator}>
          <FlatList
            data={data}
            horizontal
            renderItem={({item}) => (
              <View style={styles.itmBg}>
                <Image
                  style={styles.itm}
                  source={item.collaboratorImg}
                  resizeMode="stretch"
                />
              </View>
            )}
            keyExtractor={item => item.id}
          />
          <View style={styles.itmBg}>
            <SemiMediumTitle title="12" />
          </View>
          <SmallTitle
            title="12 Interested"
            alignSelf="flex-start"
            marginLeft={wp(4)}
          />
        </View>
      </View>
    </View>
  );
};

export default DealOfDayScreen;
