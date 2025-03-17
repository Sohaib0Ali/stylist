//================================ React Native Imported Files ======================================//

import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Modal} from 'react-native';

//================================ Local Imported Files ======================================//

import Button from '../../../../BusinessUtills/components/Button/Button';
import styles from './style';
import SemiTitle from '../../../../BusinessUtills/components/SemiTitle';
import SimpleText from '../../../../BusinessUtills/components/SimpleText/SimpleText';
import colors from '../../../../BusinessUtills/assets/colors/colors';
import DatePicker from 'react-native-date-picker';
import SelectMultiple from 'react-native-select-multiple';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Divider from '../../../../BusinessUtills/components/Divider/divider';
import moment from 'moment';
import icons from '../../../../BusinessUtills/assets/icons/icons';
import {useTranslation} from 'react-i18next';

const Days = [
  {label: 'Sunday', value: 'Sun'},
  {label: 'Monday', value: 'Mon'},
  {label: 'Tuesday', value: 'Tue'},
  {label: 'Wednesday', value: 'Wed'},
  {label: 'Thursday', value: 'Thu'},
  {label: 'Friday', value: 'Fri'},
  {label: 'Saturday', value: 'Sat'},
];
const AddLocationScheduleScreen = ({currentPage, checkSheduleValue}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());
  const [openFrom, setOpenFrom] = useState(false);
  const [opento, setOpenTo] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [unSelectDays, setUnSelectDays] = useState(Days);
  const {t} = useTranslation();

  useEffect(() => {
    checkSheduleValue({
      day: selectedDays,
      dayOff: unSelectDays,
      from: from,
      to: to,
    });
  }, [selectedDays, currentPage]);

  const onSelectionsChange = selectedDays => {
    setSelectedDays(selectedDays);
    const unselectedValues = Days.filter(
      day => !selectedDays.some(selected => selected.value === day.value),
    );
    setUnSelectDays(unselectedValues);
  };
  const renderLabel = (label, style) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{marginLeft: 10}}>
          <Text style={style}>{label}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {selectedDays.length > 0 ? (
        <>
          <View style={styles.body}>
            <View style={styles.lableSlot}>
              <SimpleText
                text={t('OpenDays')}
                alignSelf="flex-start"
                color={'#000000'}
                fontSize={wp(4.1)}
              />
            </View>
            <View style={styles.dayTimeBg}>
              <View>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  {selectedDays.map(item => {
                    return (
                      <SimpleText
                        color={'#5E5E5F'}
                        fontSize={wp(3.7)}
                        text={item?.value + ', '}
                        alignSelf={'flex-end'}
                      />
                    );
                  })}
                </View>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  <SimpleText
                    fontSize={wp(4.1)}
                    text={moment(from).format('hh:mm A')}
                  />
                  <View>
                    <Text>-</Text>
                  </View>
                  <SimpleText
                    fontSize={wp(4.1)}
                    text={moment(to).format('hh:mm A')}
                  />
                </View>
              </View>
              <View
                style={{justifyContent: 'center', paddingHorizontal: wp(2)}}>
                <Image
                  style={{
                    width: wp(2),
                    height: hp(1.6),
                    tintColor: colors.black,
                  }}
                  source={icons.next}
                />
              </View>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.lableSlot}>
              <SimpleText
                text={t('dayOff')}
                alignSelf="flex-start"
                color={'#000000'}
                fontSize={wp(4.1)}
              />
            </View>
            <View style={styles.dayTimeBg}>
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                {unSelectDays.map(item => {
                  return (
                    <SimpleText
                      color={'#5E5E5F'}
                      fontSize={wp(3.7)}
                      text={item?.value + ', '}
                      alignSelf={'flex-end'}
                    />
                  );
                })}
              </View>
              <View
                style={{justifyContent: 'center', paddingHorizontal: wp(2)}}>
                <Image
                  style={{
                    width: wp(2),
                    height: hp(1.6),
                    tintColor: colors.black,
                  }}
                  source={icons.next}
                />
              </View>
            </View>
          </View>
        </>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!isModalVisible);
        }}>
        <View style={styles.centeredView}>
          {/* HEader in MOdel */}
          <View
            style={{
              height: hp(9),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 0.15, left: wp(2)}}></View>
            <View style={{flex: 0.05}}></View>
            <View
              style={{
                flex: 0.6,
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <SemiTitle title={t('title')} fontSize={wp(4.3)} />
            </View>
            <TouchableOpacity
              style={{
                flex: 0.2,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
              onPress={() => {
                [setModalVisible(false), setOpenFrom(false), setOpenTo(false)];
              }}>
              <SimpleText
                fontSize={wp(4.3)}
                text="Add"
                paddingHorizontal={wp(4)}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              height: hp(80),
              borderRadius: wp(2.5),
              marginHorizontal: wp(4),
              backgroundColor: '#FFFFFF',
            }}>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                borderRadius: wp(2.5),
              }}>
              <TouchableOpacity
                onPress={() => [setModalVisible(false), setOpenFrom(true)]}
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: hp(8),
                }}>
                <SimpleText
                  fontSize={wp(4.1)}
                  text="Start"
                  paddingHorizontal={wp(4)}
                />
                <View
                  style={{
                    borderRadius: wp(2.5),

                    marginHorizontal: wp(4),
                    backgroundColor: '#F6F5F3',
                  }}>
                  <SimpleText
                    fontSize={wp(4.1)}
                    text={moment(from).format('hh:mm A')}
                    paddingHorizontal={wp(4)}
                  />
                </View>
              </TouchableOpacity>

              <Divider />
              <TouchableOpacity
                onPress={() => [setModalVisible(false), setOpenTo(true)]}
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: hp(8),
                }}>
                <SimpleText
                  fontSize={wp(4.1)}
                  text="End"
                  paddingHorizontal={wp(4)}
                />
                <View
                  style={{
                    borderRadius: wp(2.5),
                    marginHorizontal: wp(4),
                    backgroundColor: '#F6F5F3',
                  }}>
                  <SimpleText
                    fontSize={wp(4.1)}
                    text={moment(to).format('hh:mm A')}
                    paddingHorizontal={wp(4)}
                  />
                </View>
              </TouchableOpacity>

              <Divider />
              <SimpleText
                text={'Select on Days'}
                alignSelf={'baseline'}
                marginTop={hp(2.1)}
                paddingHorizontal={wp(3.1)}
              />
              <View>
                <SelectMultiple
                  items={Days}
                  renderLabel={renderLabel}
                  selectedItems={selectedDays}
                  onSelectionsChange={onSelectionsChange}
                  labelStyle={{color: colors.black}}
                  displayKey="label"
                  uniqueKey="value"
                  style={{paddingHorizontal: wp(4)}}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <>
        <DatePicker
          modal
          open={openFrom}
          mode="time"
          date={from}
          title="Start From"
          onConfirm={StartTime => {
            setOpenFrom(false);
            setModalVisible(true);
            setFrom(StartTime);
          }}
          onCancel={() => {
            setOpenFrom(false);
            setModalVisible(true);
          }}
        />
      </>

      <>
        <DatePicker
          modal
          open={opento}
          mode="time"
          date={to}
          title="End to"
          onConfirm={EndTime => {
            setOpenTo(false);
            setModalVisible(true);
            setTo(EndTime);
          }}
          onCancel={() => {
            setOpenTo(false);
            setModalVisible(true);
          }}
        />
      </>

      <View style={{alignItems: 'center'}}>
        <Button
          marginTop={hp(3)}
          marginBottom={hp(11)}
          buttonText={t('addMoreDays')}
          textColor={colors.btnColor}
          bgColor={colors.white}
          borderColor={colors.white}
          onPress={() => setModalVisible(true)}
        />
      </View>
    </View>
  );
};

export default AddLocationScheduleScreen;
