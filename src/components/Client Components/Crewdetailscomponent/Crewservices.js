import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import SmallText from '../../SmallText/SmallText';
import colors from '../../../assets/colors/colors';
import {scale} from 'react-native-size-matters';
import SalonDetailComponent from '../SalonDetailComponent/SalonDetailComponent';
import {FlatList} from 'react-native';

const Crewservices = ({Subservices, selected}) => {
  const [selectedItem, setSelectedItem] = useState([]);

  const setSelectedOpetions = id => {
    if (selectedItem.includes(id)) {
      setSelectedItem(selectedItem.filter(item => item !== id));
    } else {
      setSelectedItem([...selectedItem, id]);
    }
  };
  return (
    <>
      <FlatList
        data={Subservices}
        contentContainerStyle={{paddingTop: wp(2), paddingBottom: wp(4)}}
        showsVerticalScrollIndicator={false}
        style={styles.crewarea}
        renderItem={({item}) => {
          const backgroundColor =
            item?._id === selected ? colors.white : colors.white;
          // const expanded = expandedItems.includes(item.id);
          if (item === undefined) {
            return (
              <SmallText text={'No More Services'} marginBottom={wp(22)} />
            );
          } else {
            return (
              <SalonDetailComponent
                selected={selectedItem.includes(item._id) ? true : false}
                time={item?.approxtime}
                name={item?.servname}
                price={item?.price}
                img={item.icon}
                // backgroundColor={{backgroundColor}}
                type={item.currency}
                onPress={() => {
                  setSelectedOpetions(item._id);
                }}
                service
              />
            );
          }
        }}
        keyExtractor={item => item?._id}
        extraData={selected}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(184),
    height: scale(68),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: scale(10),
    alignSelf: 'center',
  },
  profileimg: {
    width: scale(52),
    height: scale(52),
    borderRadius: scale(30),
    borderWidth: 1.5,
    borderColor: colors.btnColor,
  },
});

export default Crewservices;
