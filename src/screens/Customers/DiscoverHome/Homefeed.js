import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Homefeed = () => {
  const Near_Data = [
    {
      salon_id: 1,
      salon_name: 'Tony & Guy',
      salon_desc: 'Book and experience our stylist',
      salon_rating: 4.8,
      salon_review: 12,
      salon_Fav: true,
      salon_logo:
        'http://ec2-3-143-212-104.us-east-2.compute.amazonaws.com:5000/uploads/images/2022-12-19T10-36-04.665Z-woman7.png',
      salon_profile:
        'https://komb.s3.us-east-2.amazonaws.com/rn_image_picker_lib_temp_00f8408e-bb19-4d6e-804e-89557a2e85a4.jpg',
      Address: 'Johar Town',
      distance: 1.3,
    },
    {
      salon_id: 2,
      salon_name: 'Tony & Guy',
      salon_desc: 'Book and experience our stylist',
      salon_rating: 4.8,
      salon_review: 12,
      salon_Fav: true,
      salon_logo:
        'http://ec2-3-143-212-104.us-east-2.compute.amazonaws.com:5000/uploads/images/2022-12-19T10-36-04.665Z-woman7.png',
      salon_profile:
        'https://komb.s3.us-east-2.amazonaws.com/rn_image_picker_lib_temp_00f8408e-bb19-4d6e-804e-89557a2e85a4.jpg',
      Address: 'Johar Town',
      distance: 1.3,
    },
  ];

  const offersData = [
    {
      id: '1',
      img: images.man8,
      offerDescription: '15% Cashback when you refer two friends',
    },
    {
      id: '2',
      img: images.man8,
      offerDescription: '15% Cashback when you refer two friends',
    },
  ];

  const populerstylist = [
    {
      id: '1',
      img: images.man3,
      name: 'Adam Smith',
    },
    {
      id: '2',
      img: images.man4,
      name: 'John Alex',
    },
  ];
  const Hairstyless = [
    {
      id: '1',
      Hairstylesimg:
        'https://ath2.unileverservices.com/wp-content/uploads/sites/4/2019/10/2019-11-04-Full-Pompadour_0513-532x798.jpg',
      stylename: 'Slick Pompadour',
    },
    {
      id: '2',
      Hairstylesimg:
        'https://ath2.unileverservices.com/wp-content/uploads/sites/4/2016/04/two-asian-mens-hair-dsquared2_723_fw16-2-768x889.jpg',
      stylename: 'The French Crop',
    },
  ];

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: colors.white3}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <SemiTitle
            paddingHorizontal={wp('4')}
            title={t('hotnearyou')}
            marginTop={wp(1)}
            fontWeight={'600'}
            color={colors.headingBlack}
            fontSize={16}
          />
          <TouchableOpacity>
            <SemiTitle
              paddingHorizontal={wp('4')}
              title={t('seeAll')}
              marginTop={wp(1)}
              fontWeight={'400'}
              color={colors.btnColor}
              fontSize={16}
            />
          </TouchableOpacity>
        </View>

        {/* What’s hot near you */}
        <FlatList
          contentContainerStyle={{paddingLeft: '4%'}}
          showsHorizontalScrollIndicator={false}
          data={Near_Data}
          renderItem={({item, index}) => {
            const backgroundColor = Colors[index % Colors.length];
            const borderColor = Colors[index % Colors.length];
            return (
              <NearbyComponent
                key={index}
                backgroundColor={{backgroundColor}}
                borderColor={{borderColor}}
                id={item?.salon_id}
                logo={item.salon_logo}
                title={item.salon_name}
                address={item.Address}
                profileImage={item.salon_profile}
                rating={item.salon_rating}
                discription={item.salon_desc}
                distance={item?.distance}
                review={item?.salon_review}
              />
            );
          }}
          keyExtractor={item => item.salon_id}
          horizontal
        />

        <SemiTitle
          paddingHorizontal={wp('4')}
          title={t('mostpopular')}
          marginTop={hp(7)}
          fontWeight={'600'}
          color={colors.headingBlack}
          fontSize={16}
        />
        {checkFilter && filteredpopularData.length < 1 ? (
          <View style={{width: wp(100), alignItems: 'center'}}>
            <Text style={{fontSize: wp(4)}}>{t('NoDatafound')}</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingLeft: '4%',
              marginTop: scale(19),
            }}
            showsHorizontalScrollIndicator={false}
            data={
              filteredpopularData.length > 0 ? filteredpopularData : popularData
            }
            renderItem={({item, index}) => {
              return (
                <BarberComponent
                  id={item.salon._id}
                  fav={item.favorite}
                  img={item.salon.profileImage}
                  time={item.time}
                  name={item.salon.businessName}
                  address={item.salon.address}
                  company={item.salon.company}
                  favoriteData={favoriteData}
                  onPress={() => nestedBottomSheetModalRef.current?.present()}
                />
              );
            }}
            keyExtractor={item => item.salon._id}
            horizontal
          />
        )}

        {/* Special Offers  component*/}

        <SemiTitle
          paddingHorizontal={wp('4')}
          title={t('specialOffer')}
          marginTop={hp(5)}
          fontWeight={'600'}
          color={colors.headingBlack}
          fontSize={16}
        />

        <FlatList
          contentContainerStyle={{
            paddingBottom: hp(4),
            paddingHorizontal: wp('4%'),
            paddingTop: hp(4),
          }}
          ItemSeparatorComponent={() => <View style={{marginRight: wp(4.5)}} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={offersData}
          renderItem={({item, index}) => (
            <OfferComponent
              id={item.id}
              img={item.img}
              offers={item.offerDescription}
            />
          )}
          keyExtractor={item => item.backgroundColor}
        />
        <View
          style={{
            width: '100%',
            height: scale(165),
            backgroundColor: colors.purple2,
            marginBottom: scale(10),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: scale(10),
              marginTop: hp(1),
            }}>
            <SemiTitle
              paddingHorizontal={wp('4')}
              title={t('popularstylists')}
              marginTop={wp(1)}
              fontWeight={'600'}
              color={colors.headingBlack}
              fontSize={16}
            />
            <TouchableOpacity>
              <SemiTitle
                paddingHorizontal={wp('4')}
                title={t('seeAll')}
                marginTop={wp(1)}
                fontWeight={'400'}
                color={colors.Darkblack}
                fontSize={16}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            contentContainerStyle={{
              paddingBottom: hp(4),
              paddingHorizontal: wp('4%'),
            }}
            ItemSeparatorComponent={() => (
              <View style={{marginRight: wp(4.5)}} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={populerstylist}
            renderItem={({item, index}) => (
              <PopularStylist
                id={item.id}
                profileimg={item.img}
                stylistname={item.name}
              />
            )}
            keyExtractor={item => item.backgroundColor}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: scale(10),
            marginTop: hp(1),
          }}>
          <SemiTitle
            paddingHorizontal={wp('4')}
            title={t('menhairstyles')}
            marginTop={wp(1)}
            fontWeight={'600'}
            color={colors.headingBlack}
            fontSize={16}
          />
          <TouchableOpacity>
            <SemiTitle
              paddingHorizontal={wp('4')}
              title={t('seeAll')}
              marginTop={wp(1)}
              fontWeight={'400'}
              color={colors.btnColor}
              fontSize={16}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{
            paddingBottom: hp(4),
            paddingHorizontal: wp('4%'),
          }}
          ItemSeparatorComponent={() => <View style={{marginRight: wp(4.5)}} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Hairstyless}
          renderItem={({item, index}) => (
            <Hairstyles
              id={item.id}
              Hairstylesimg={item.Hairstylesimg}
              stylename={item.stylename}
            />
          )}
          keyExtractor={item => item.backgroundColor}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: scale(12),
            marginTop: hp(1),
          }}>
          <SemiTitle
            paddingHorizontal={wp('4')}
            title={t('hotornot')}
            marginTop={wp(1)}
            fontWeight={'600'}
            color={colors.headingBlack}
            fontSize={16}
          />
          <TouchableOpacity>
            <SemiTitle
              paddingHorizontal={wp('4')}
              title={t('seeAll')}
              marginTop={wp(1)}
              fontWeight={'400'}
              color={colors.btnColor}
              fontSize={16}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{
            paddingBottom: hp(4),
            paddingHorizontal: wp('4%'),
            paddingTop: hp(2),
          }}
          ItemSeparatorComponent={() => <View style={{marginRight: wp(4.5)}} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Hairstyless}
          renderItem={({item, index}) => (
            <HotorNot
              id={item.id}
              Hairstylesimg={item.Hairstylesimg}
              stylename={item.stylename}
            />
          )}
          keyExtractor={item => item.backgroundColor}
        />
      </View>
    </ScrollView>
  );
};

export default Homefeed;

const styles = StyleSheet.create({});
