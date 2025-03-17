import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import DashboardScreen from '../screens/Bussiness/DashboardScreen';
import icons from '../BusinessUtills/assets/icons/icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {scale, verticalScale} from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import BottomManageScreen from '../screens/Bussiness/BottomScreen/BottomSeatManageScreen';
import {useSelector} from 'react-redux';

const TabArray = [
  {
    route: 'DashboardScreen',
    label: 'Dashboard',
    activeIcon: icons.dashboard,
    activeColor: '#FFFFFF',
    size: 25,
    inActiveIcon: icons.dashboard,
    component: DashboardScreen,
  },
  {
    route: 'BottomManageScreenSeat',
    label: 'Seat',
    activeIcon: icons.pin,
    activeColor: '#FFFFFF',
    size: 25,
    inActiveIcon: icons.pin,
    component: BottomManageScreen,
    props: {
      selectedIndex: 0,
    },
  },
  {
    route: 'BottomManageScreenServices',
    label: 'Services',
    activeIcon: icons.services,
    activeColor: '#FFFFFF',
    size: 25,
    inActiveIcon: icons.services,
    component: BottomManageScreen,
    props: {
      selectedIndex: 1,
    },
  },
  {
    route: 'BottomManageScreenOffer',
    label: 'Offer',
    activeIcon: icons.stylist,
    activeColor: '#FFFFFF',
    size: 25,
    inActiveIcon: icons.stylist,
    component: BottomManageScreen,
    props: {
      selectedIndex: 2,
    },
  },
];
const BottomTab = () => {
  const closeTab = useSelector(state => state?.sheetManger?.closeTab);
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="DashboardScreen"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomBottomTabBar {...props} isClose={closeTab} />}>
      {TabArray.map((item, index) => {
        return (
          <Tab.Screen
            key={item.route}
            name={item.route}
            options={{tabBarLabel: item.label}}
            component={({route, navigation}) => {
              const selectedTab = TabArray.find(
                item => item.route === route.name,
              );
              const selectedIndex = selectedTab?.props?.selectedIndex;
              return (
                <selectedTab.component
                  {...route.params}
                  selectedIndex={selectedIndex}
                  navigation={navigation}
                />
              );
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTab;

export function CustomBottomTabBar({state, descriptors, navigation, isClose}) {
  const currentRoute = state.routes[state.index].name;

  // Define the routes where you want to hide the bottom tab bar
  const hiddenRoutes = [
    'BottomManageScreenSeat',
    'BottomManageScreenServices',
    'BottomManageScreenOffer',
  ];

  // Check if the current route is in the hiddenRoutes array
  const shouldHideTabBar = hiddenRoutes.includes(currentRoute);

  // Render the tab bar only if shouldHideTabBar is false
  if (shouldHideTabBar) {
    return null;
  }

  if (isClose === false) {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: scale(50),
          backgroundColor: '#27232C',
          position: 'absolute',
          bottom: verticalScale(25),
          right: 0,
          left: 0,
          borderRadius: scale(35),
          marginHorizontal: scale(15),
          borderWidth: 1,
        }}>
        {TabArray.map((Tabs, index) => {
          const isFocused = state?.index === index;
          const viewRef = useRef(null);
          useEffect(() => {
            if (isFocused) {
              viewRef.current.animate({
                0: {rotate: '0deg'},
                1: {rotate: '360deg'},
              });
            } else {
              viewRef.current.animate({
                0: {rotate: '360deg'},
                1: {rotate: '0deg'},
              });
            }
          }, [isFocused]);
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPressd',
              target: Tabs.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(Tabs.route);
            }
          };
          return (
            <TouchableOpacity
              key={Tabs.key}
              onPress={onPress}
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Animatable.View
                ref={viewRef}
                duration={700}
                style={styles.container}>
                <Image
                  source={Tabs?.activeIcon}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: isFocused ? Tabs.activeColor : null,
                  }}
                  resizeMode="contain"
                />
              </Animatable.View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  } else {
    return null;
  }
}
const styles = StyleSheet.create({
  bottomText: {
    fontSize: 11,
    color: 'black',
  },
});
