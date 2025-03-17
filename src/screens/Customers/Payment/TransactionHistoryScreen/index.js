//================================ React Native Imported Files ======================================//
import React from 'react';
import {View, ScrollView, TouchableOpacity, SectionList} from 'react-native';

//================================ Local Imported Files ======================================//

import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../../../../components/Header/Header';
import Title from '../../../../components/Title/Title';
import Divider from '../../../../components/Divider/divider';
import SemiMediumTitle from '../../../../components/Semi Medium Title';
import SimpleText from '../../../../components/SimpleText/SimpleText';
import colors from '../../../../assets/colors/colors';
import SmallText from '../../../../components/SmallText/SmallText';
import SmallTitle from '../../../../components/SmallTitle/SmallTitle';

const Data = [
  {
    title: 'July, 2022',
    data: [
      {
        id: '1',
        name: 'La Coupë',
        price: '50',
        type: 'Haircut',
        date: '20 July at 11:30 AM',
        priceType: 'USD',
      },
      {
        id: '2',
        name: 'Room',
        price: '60',
        type: 'Hair style',
        date: '12 July at 09:05 AM',
        priceType: 'USD',
      },
      {
        id: '3',
        name: 'Arc Beauty',
        price: '40',
        type: 'Beard',
        date: '06 July at 06:40 AM',
        priceType: 'USD',
      },
    ],
  },
  {
    title: 'June, 2022',
    data: [
      {
        id: '1',
        name: 'La Coupë',
        price: '60',
        type: 'Hair style',
        date: '8 June at 9:05 AM',
        priceType: 'USD',
      },
      {
        id: '2',
        name: 'Room',
        price: '50',
        type: 'Haircut',
        date: '3 June at 11:30 AM',
        priceType: 'USD',
      },
    ],
  },
];
const Item = ({name, price, type, date}) => (
  <View>
    <TouchableOpacity style={styles.itemBg}>
      <View style={styles.row}>
        <SimpleText text={name} color={colors.black} alignSelf="flex-start" />
        <View style={{flexDirection: 'row'}}>
          <SmallTitle title="USD" alignSelf="center" marginRight={wp(1)} />
          <SemiMediumTitle title={price} alignSelf="flex-end" />
        </View>
      </View>
      <View style={styles.row}>
        <SmallText text={type} alignSelf="flex-start" />
        <SimpleText text={date} alignSelf="flex-end" />
      </View>
    </TouchableOpacity>
    <Divider />
  </View>
);

const TransactionHistoryScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header paddingHorizontal={0.01} />
      <Title
        title={t('transactionHistory')}
        alignSelf="flex-start"
        marginTop={hp(1)}
      />

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        <SectionList
          sections={Data}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <Item
              name={item.name}
              price={item.price}
              type={item.type}
              date={item.date}
              priceType={item.priceType}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <SemiMediumTitle title={title} marginTop={hp(3)} />
          )}
        />
      </ScrollView>
    </View>
  );
};

export default TransactionHistoryScreen;
