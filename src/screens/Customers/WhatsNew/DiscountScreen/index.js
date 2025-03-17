//================================ React Native Imported Files ======================================//
import React from 'react';
import {View, ScrollView, FlatList} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../../components/Header/Header';
import icons from '../../../../assets/icons/icons';
import Title from '../../../../components/Title/Title';
import StudentDiscountComponent from '../../../../components/Client Components/WhatsNew/StudentDiscountComponent';

const data = [
  {
    id: '1',
    discount: '15% off',
    day: 'Every Monday',
    name: 'Toney & Guy',
  },
  {
    id: '2',
    discount: '10% off',
    day: 'For third haircut',
    name: 'Arc Beauty',
  },
  {
    id: '3',
    discount: 'Beard free',
    day: 'For a haircut',
    name: 'Toney & Guy',
  },
  {
    id: '4',
    discount: '15% off',
    day: 'For a hairstyle',
    name: 'Room',
  },
  {
    id: '5',
    discount: '10% off',
    day: 'Every Friday',
    name: 'Toney & Guy',
  },
  {
    id: '6',
    discount: 'Free hairstyle',
    day: 'For a haircut',
    name: 'Toney & Guy',
  },
];
const DiscountScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header randomIcon={icons.search} small />
      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <Title
          title="Student discount"
          alignSelf="flex-start"
          marginTop={hp(1)}
          marginBottom={hp(3)}
        />
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'center',
          }}
          ItemSeparatorComponent={() => (
            <View style={{marginBottom: wp(4.5)}} />
          )}
          data={data}
          numColumns={2}
          renderItem={({item}) => (
            <StudentDiscountComponent
              discount={item.discount}
              day={item.day}
              name={item.name}
              onPress={() => navigation.navigate('DISCOUNT_DETAIL_SCREEN')}
            />
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
};

export default DiscountScreen;
