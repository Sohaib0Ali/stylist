import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fonts from '../../../../BusinessUtills/assets/fonts/fonts';
import { scale } from 'react-native-size-matters';
import Icons from 'react-native-vector-icons/AntDesign';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

const DropdownMenu = ({
  textConinerstyle,
  title,
  placeholder,
  height,
  direction,
  Data,
  selecteID,
  onPassData,
  isindex,
  serviceId,
  slectedserviceName,
  available,
  singleselect,
}) => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectText, setisSelectedText] = useState('');
  const [selectedindex, setSelectedIndex] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [passData, setPassData] = useState([]);
  const [workStatusChange, setWorkStatusChange] = useState('');
  if (selectedindex !== null) {
  }

  if (onPassData) {
    onPassData(passData);
  }
  const handleSubcategorySelection = (selectedSubcategory, serviceId) => {
    let foundIndex = passData.findIndex(obj => obj.serviceId === serviceId);

    switch (foundIndex) {
      case -1:
        // If the serviceId is not found in passData, add a new object to the array with the selected subcategory
        setPassData([
          ...passData,
          { serviceId, subCategory: [selectedSubcategory] },
        ]);
        break;
      default:
        // If the serviceId is found in passData, update its subCategory array with the selected subcategory
        let updatedSubCategory = [...passData[foundIndex].subCategory];
        if (updatedSubCategory.includes(selectedSubcategory)) {
          updatedSubCategory = updatedSubCategory.filter(
            id => id !== selectedSubcategory,
          );
        } else {
          updatedSubCategory.push(selectedSubcategory);
        }
        const updatedObject = {
          ...passData[foundIndex],
          subCategory: updatedSubCategory,
        };
        const updatedArray = [...passData];
        updatedArray[foundIndex] = updatedObject;
        setPassData(updatedArray);
        break;
    }
  };

  const RenderItem = ({ item }) => {
    const items = { ...item, isServices: false };
    const isSelected = selectedItems.includes(item._id);
    return (
      <View
        style={{
          marginBottom: scale(1),
          padding: scale(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{ fontSize: 14, fontWeight: '700', marginBottom: scale(5) }}>
            {items?.name}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '400', color: '#5E5E5F' }}>
            {item?.duration}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.selectedRadio,
            {
              backgroundColor: isSelected
                ? '#12D229'
                : selectedindex === item?._id
                  ? '#12D229'
                  : null,
            },
          ]}
          onPress={() => {
            if (singleselect) {
              setSelectedIndex(item._id);
              selecteID(item._id);
              slectedserviceName(items?.name);
              setDropdownOpen(!dropdownOpen);
            } else {
              if (isSelected) {
                setSelectedItems(selectedItems.filter(id => id !== item._id));
              } else {
                setSelectedItems([...selectedItems, item._id]);
              }
              handleSubcategorySelection(item._id, serviceId);
            }
          }}></TouchableOpacity>
      </View>
    );
  };
  return (
    <View>
      {direction === 'RTL' ? (
        <View style={[styles.container]}>
          <TouchableOpacity
            style={styles.languageText}
            onPress={() => setDropdownOpen(!dropdownOpen)}>
            <Icons name="down" size={20} color={'black'} />
          </TouchableOpacity>
          <View style={[styles.leftContainer, {}]}>
            <Text style={styles.title}>{title}</Text>
            <Text style={[styles.titleright, { direction: 'rtl' }]}>
              {selectText === '' ? placeholder : selectText}
            </Text>
          </View>
        </View>
      ) : (
        <View style={[styles.container, textConinerstyle, {}]}>
          <View style={styles.leftContainer}>
            {title ? (
              <Text style={{ ...styles.title, alignSelf: 'flex-start' }}>
                {title}
              </Text>
            ) : null}
            <Text
              style={[
                styles.input,
                height
                  ? {
                    height: hp(16),
                    textAlignVertical: 'top',
                    paddingTop: hp(1),
                  }
                  : null,
              ]}>
              {selectText === '' ? placeholder : selectText}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.languageText}
            onPress={() => setDropdownOpen(!dropdownOpen)}>
            <Icons name="down" size={20} color={'black'} />
          </TouchableOpacity>
        </View>
      )}
      {dropdownOpen && (
        <FlatList
          data={Data}
          nestedScrollEnabled={true}
          style={{ height: Data.length > 3 ? scale(200) : null }}
          renderItem={RenderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default DropdownMenu;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.subHeading,
    borderWidth: scale(0.7),
    marginBottom: hp(1),
    borderColor: colors.grey,
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
  },
  title: {
    color: colors.grey,
    fontFamily: fonts.medium,
    fontSize: 12,
    marginTop: wp(2),
    alignSelf: 'flex-end',
  },
  titleright: {
    color: colors.grey,
    fontFamily: fonts.medium,
    fontSize: 12,
    marginTop: wp(2),
    alignSelf: 'flex-end',
    fontFamily: fonts.bold,
    // height: Platform.OS == 'ios' ? hp(4) : hp(5.5),
    fontSize: 16,
    // fontSize:wp(4),
    color: colors.black,
    selectionColor: colors.black,
    fontFamily: fonts.regular,
  },
  input: {
    backgroundColor: 'transparent',
    paddingTop: 0,
    fontFamily: fonts.bold,
    height: Platform.OS == 'ios' ? hp(4) : hp(5.5),
    fontSize: 16,
    // fontSize:wp(4),
    color: colors.black,
    selectionColor: colors.black,
    fontFamily: fonts.regular,
  },
  languageText: {
    // color: "#848286",
    // marginRight: scale(20),
    // fontSize: 14,
    // fontWeight: "500",
    alignSelf: 'center',
  },
  selectedRadio: {
    height: scale(20),
    width: scale(20),
    borderRadius: scale(100),
    borderWidth: 2,
    borderColor: '#EBE9E5',
    marginRight: scale(25),
    alignSelf: 'center',
  },
});
