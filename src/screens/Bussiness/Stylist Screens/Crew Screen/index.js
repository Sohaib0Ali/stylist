//================================ React Native Imported Files ======================================//

import React, {useState, useRef} from 'react';
import {View, FlatList} from 'react-native';
import styles from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import SalonDetailComponent from '../../../../BusinessUtills/components/Business Components/SalonDetailComponent/SalonDetailComponent';
import CrewDetails from '../../../../BusinessUtills/components/Client Components/Crew Details';
import RBSheet from 'react-native-raw-bottom-sheet';
import images from '../../../../BusinessUtills/assets/images/images';

const salonData = [
  {
    id: '1',
    cat: 'Manager',
    name: 'Zoe Ting',
    price: '25',
    img: images.woman1,
    type: 'USD',
  },
  {
    id: '2',
    cat: 'Top master',
    name: 'Cody Fisher',
    price: '23',
    img: images.man,
    type: 'USD',
  },
  {
    id: '3',
    cat: 'Master',
    name: 'Kathryn marphy',
    price: '230',
    img: images.woman2,
    type: 'USD',
  },
  {
    id: '4',
    cat: 'Manager',
    name: 'Jerome Bell',
    price: '25',
    img: images.woman3,
    type: 'USD',
  },
  {
    id: '5',
    cat: 'Top master',
    name: 'Bessie Cooper',
    price: '23',
    type: 'USD',
  },
  {
    id: '6',
    cat: 'Master',
    name: 'Beard Trim',
    price: '230',
    img: images.barber,
    type: 'USD',
  },
];

const CrewScreen = () => {
  const refRBSheet = useRef();
  const [selected, setSelected] = useState(null);
  return (
    <View style={styles.container}>
      <FlatList
        data={salonData}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          const backgroundColor =
            item.id === selected ? colors.yellow : colors.white;
          return (
            <SalonDetailComponent
              cat={item.cat}
              name={item.name}
              price={item.price}
              img={item.img}
              type={item.type}
              backgroundColor={{backgroundColor}}
              onPress={() => {
                setSelected(item.id), refRBSheet.current.open();
              }}
            />
          );
        }}
        keyExtractor={item => item.id}
        extraData={selected}
      />
      <RBSheet
        height={hp(100)}
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            borderTopLeftRadius: wp(4),
            borderTopRightRadius: wp(4),
          },
          draggableIcon: {
            backgroundColor: colors.borderColor,
          },
        }}>
        <CrewDetails />
      </RBSheet>
    </View>
  );
};

export default CrewScreen;
