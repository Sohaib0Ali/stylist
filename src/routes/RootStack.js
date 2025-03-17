//================================ React Native Imported Files ======================================//
import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

//================================ Local Imported Files ======================================//

import {
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  SPLASH_SCREEN,
  ON_BOARDING_SCREEN,
  OTP_SCREEN,
  RESEND_OTP_SCREEN,
  RESET_PASSWORD_SCREEN,
  CREATE_NEW_PASSWORD_SCREEN,
  ENTER_NUMBER_SCREEN,
  SEARCH_SCREEN,
  MAP_VIEW_SCREEN,
  SALON_SCREEN,
  CREW_REVIEW_SCREEN,
  ADD_REVIEW_SCREEN,
  CHOOSE_MASTER_SCREEN,
  CHOOSE_TYPE_SCREEN,
  SELECT_DATE_SCREEN,
  SELECT_TIME_SCREEN,
  CONFIRM_BOOKING_SCREEN,
  PAYMENT_METHOD_SCREEN,
  SELECTED_PAYMENT_METHOD_SCREEN,
  RATE_COMPANY_SCREEN,
  FEEDBACK_SCREEN,
  NOTIFICATION_SCREEN,
  NOTIFICATION_SETTING_SCREEN,
  EDIT_PROFILE_SCREEN,
  BOOKED_SCREEN,
  BOOKING_DETAIL_SCREEN,
  BOOKED_SECTION_SCREEN,
  WHATS_NEW_SCREEN,
  DISCOUNT_SCREEN,
  DISCOUNT_DETAIL_SCREEN,
  FAVORITES_SCREEN,
  PROMO_CODES_SCREEN,
  REWARD_CREDIT_SCREEN,
  TERMS_POLICY_SCREEN,
  HELP_CENTER_SCREEN,
  REGISTER_COMPLAINT_SCREEN,
  FAQ_DETAIL_SCREEN,
  PAYMENT_SCREEN,
  ADD_NEW_CARD_SCREEN,
  TRANSACTION_HISTORY_SCREEN,
  ADD_PHOTO_SCREEN,
  TIP_SCREEN,
  ADD_PHOTO_AFTER_SCREEN,
  MEMORIES_SCREEN,
  FILTER_SCREEN,
  ENTER_NAME_SCREEN,
  GUEST_SIGNUP_SCREEN,
  RESET_PASSWORD_OTP_SCREEN,
  BEFORE_BOOKING_DETAILSSCREEN,
  BEFORE_MEMORIES,
  AFTER_SCREEN,
  ONBOARDING_PERMISSION_SCREEN,
  DISCOUNT_HOME,
  PROFILE_SCREEN,
  POPULARSTYLIST,
  CONFIRM_BOOK,
  HOTORNOT,
  LANGAUAGESECTION,
  ROLESELECTION,
  BREGISTER_SCREEN,
  BLOGIN_SCREEN,
  BOTP_SCREEN,
  ENTER_EMAIL_SCREEN,
  BUSINESS_PROFILE_SCREEN,
  BADDRESS_MAP_SCREEN,
  DASHBOARD_SCREEN,
  NEW_BOTTOM_MANAGE_SCREEN,
  BSTYLIST_SCREEN,
  MENHAIRSTYLE,
  STYLECOLLECTION,
  UPLOAD_HOT_PIC,
  STYLIST_CONFIRM_APPOINTMENT,
  STYLIST_ADD_APPOINTMENT,
  EDIT_PROFILE_HOME,
  ADD_LOCATION_HOME,
} from '../constants/navigators';
import SplashScreen from '../screens/Auth/SplashScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import OnBoardingScreen from '../screens/Auth/OnBoarding';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import OtpScreen from '../screens/Auth/OtpScreen/OtpScreen';
import ResendOtpScreen from '../screens/Auth/ResendOtpScreen/ResendOtpScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPassword/ResetPassword';
import CreateNewPasswordScreen from '../screens/Auth/CreateNewPassword/CreateNewPassword';
import SearchScreen from '../screens/Customers/Map/SearchScreen/SearchScreen';
import EnterNumberScreen from '../screens/Customers/GuestFlow/EnterNumber';
import MapViewScreen from '../screens/Customers/Map/MapView';
import SalonScreen from '../screens/Customers/Salon Section/Salon Screen';
import BottomTab from './BottomTab';
import CrewReviewScreen from '../screens/Customers/Crew Section/Crew Review Screen';
import AddReviewScreen from '../screens/Customers/Crew Section/AddReview';
import ChooseMasterScreen from '../screens/Customers/Booking/Choose Master';
import ChooseTypeScreen from '../screens/Customers/Booking/Choose Type';
import SelectDateScreen from '../screens/Customers/Booking/Select Date';
import SelectTimeScreen from '../screens/Customers/Booking/Select Time';
import ConfirmBookingScreen from '../screens/Customers/Booking/Confirm Booking';
import PaymentMethodScreen from '../screens/Customers/Booking/Payment Method';
import SelectedPaymentMethodScreen from '../screens/Customers/Booking/Selected Payment Method';
import RateCompanyScreen from '../screens/Customers/Rate A Company/RateCompany';
import FeedBackScreen from '../screens/Customers/Rate A Company/FeedBackScreen';
import NotificationScreen from '../screens/Customers/Notification/Notifications';
import NotificatonSettingScreen from '../screens/Customers/Notification/NotificationSettings';
import EditProfileScreen from '../screens/Customers/Profile/EditProfile';
import BookedScreen from '../screens/Customers/Booked/BookedScreen';
import BookingDetailScreen from '../screens/Customers/Booked/BookingDetailScreen';
import BookedSectionScreen from '../screens/Customers/Booked/BookedSection';
import WhatsNewScreen from '../screens/Customers/WhatsNew/WhatsNewScreen';
import DiscountScreen from '../screens/Customers/WhatsNew/DiscountScreen';
import DiscountDetailScreen from '../screens/Customers/WhatsNew/DiscountDetailScreen';
import FavoritesScreen from '../screens/Customers/FavoritesScreen';
import PromoCodesScreen from '../screens/Customers/PromoCodesScreen';
import RewardCreditScreen from '../screens/Customers/RewardCredits/RewardCreditScreen';
import TermsPolicyScreen from '../screens/Customers/TermsPolicy/TermsPolicyScreen';
import HelpCenterScreen from '../screens/Customers/HelpCenter/HelpCenterScreen';
import FAQDetailScreen from '../screens/Customers/HelpCenter/FAQDetailScreen';
import RegisterComplaintScreen from '../screens/Customers/HelpCenter/RegisterComplaintScreen';
import PaymentScreen from '../screens/Customers/Payment/PaymentScreen';
import AddNewCardScreen from '../screens/Customers/Payment/AddNewCarScreen';
import TransactionHistoryScreen from '../screens/Customers/Payment/TransactionHistoryScreen';
import AddPhotoScreen from '../screens/Customers/Treatment/BeforeTreatment/AddPhotoScreen';
import TipScreen from '../screens/Customers/Treatment/AfterTreatment/TipScreen';
import AddPhotoAfterScreen from '../screens/Customers/Treatment/AfterTreatment/AddPhotoAfterScreen';
import MemoriesScreen from '../screens/Customers/Treatment/AfterTreatment/MemoriesScreen';
import FilterScreen from '../screens/Customers/Filter/FilterScreen';
import GuestSignUpScreen from '../screens/Customers/GuestFlow/GuestSignUp';
import EnterNameScreen from '../screens/Customers/GuestFlow/EnterName';
import ResetPassOtpScreen from '../screens/Auth/ResetPassOtpScreen';
import BeforeBookingDetailsScreen from '../screens/Customers/BeforeScreen/BeforeBookingDetailsScreen';
import BeforeMemories from '../screens/Customers/BeforeScreen/BeforeMemories';
import AfterScreen from '../screens/Customers/AfterScreen';
import OnBoardPermission from '../screens/Auth/OnBoarding/OnBoardPermission';
import DiscoverHome from '../screens/Customers/DiscoverHome';
import ProfileScreen from '../screens/Customers/Profile/ProfileScreen';
import PopularStylistScreen from '../screens/Customers/PopularStylist/index';
import Confirm_book from '../screens/Customers/Confirm_book/index';
import HotorNot from '../screens/Customers/HotorNot/index';
import LangauageSection from '../screens/Auth/LanguageSelection/index';
import RoleSelection from '../screens/Auth/RoleSelection/index';
import BRegisterScreen from '../screens/BAuth/Auth/RegisterScreen';
import BLoginScreen from '../screens/BAuth/Auth/LoginScreen';
import BOtpScreen from '../screens/BAuth/Auth/OtpScreen/OtpScreen';
import EnterEmailScreen from '../screens/BAuth/Auth/EnterEmailScreen/EnterEmailScreen';
import BusinessProfileScreen from '../screens/BAuth/Auth/Profile/BusinessProfileScreen/BusinessProfileScreen';
import AdressMapScreen from '../screens/BAuth/Auth/Profile/AddressMapScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomManageScreen from '../screens/Bussiness/BottomScreen/BottomSeatManageScreen';
import StylistScreen from '../screens/Bussiness/Stylist Screens/StylistScreen';
import MenHairstylesScreen from '../screens/Customers/MenHairstyles';
import StyleCollectionScreen from '../screens/Customers/stylelistcollection';
import UploadPicModal from '../screens/Customers/HotorNot/UploadPicModal';
import StylistConfirmAppointmentScreen from '../screens/Bussiness/Stylist Screens/Appointment Screen/ConfirmationScreen/StylistConfirmAppointmentScreen';
import StylistAddAppointment from '../screens/Bussiness/Stylist Add Appointment';
import EditProfileHome from '../screens/Bussiness/EditProfile/EditProfileHome';
import AddLocationHome from '../screens/Bussiness/AddLocationScreen/AddLocationHome';

const RootStack = createStackNavigator();
const Stack = props => {
  const [hideBottomTab, setHideBottomTab] = React.useState(false);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={props.routeName}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <RootStack.Screen name={SPLASH_SCREEN} component={SplashScreen} />

        <RootStack.Screen
          name={BEFORE_BOOKING_DETAILSSCREEN}
          component={BeforeBookingDetailsScreen}
        />
        <RootStack.Screen name={BEFORE_MEMORIES} component={BeforeMemories} />
        <RootStack.Screen name={AFTER_SCREEN} component={AfterScreen} />
        <RootStack.Screen
          name={LOGIN_SCREEN}
          component={LoginScreen}
          initialParams={{userLoginCallBack: props.userLoginCallBack}}
        />
        <RootStack.Screen name={REGISTER_SCREEN} component={RegisterScreen} />
        <RootStack.Screen
          name={ON_BOARDING_SCREEN}
          component={OnBoardingScreen}
        />
        <RootStack.Screen name={OTP_SCREEN} component={OtpScreen} />
        <RootStack.Screen
          name={RESEND_OTP_SCREEN}
          component={ResendOtpScreen}
        />
        <RootStack.Screen
          name={RESET_PASSWORD_SCREEN}
          component={ResetPasswordScreen}
        />
        <RootStack.Screen
          name={CREATE_NEW_PASSWORD_SCREEN}
          component={CreateNewPasswordScreen}
        />
        {/* Customer */}
        <RootStack.Screen name={DISCOUNT_HOME} component={DiscoverHome} />
        <RootStack.Screen
          name={ENTER_NUMBER_SCREEN}
          component={EnterNumberScreen}
        />
        <RootStack.Screen name={SEARCH_SCREEN} component={SearchScreen} />
        <RootStack.Screen name={MAP_VIEW_SCREEN} component={MapViewScreen} />
        <RootStack.Screen name={SALON_SCREEN} component={SalonScreen} />
        <RootStack.Screen
          name={CREW_REVIEW_SCREEN}
          component={CrewReviewScreen}
        />
        <RootStack.Screen
          name={ADD_REVIEW_SCREEN}
          component={AddReviewScreen}
        />
        <RootStack.Screen
          name={CHOOSE_MASTER_SCREEN}
          component={ChooseMasterScreen}
        />
        <RootStack.Screen
          name={CHOOSE_TYPE_SCREEN}
          component={ChooseTypeScreen}
        />
        <RootStack.Screen
          name={SELECT_DATE_SCREEN}
          component={SelectDateScreen}
        />
        <RootStack.Screen
          name={SELECT_TIME_SCREEN}
          component={SelectTimeScreen}
        />
        <RootStack.Screen
          name={CONFIRM_BOOKING_SCREEN}
          component={ConfirmBookingScreen}
        />
        <RootStack.Screen
          name={PAYMENT_METHOD_SCREEN}
          component={PaymentMethodScreen}
        />
        <RootStack.Screen
          name={SELECTED_PAYMENT_METHOD_SCREEN}
          component={SelectedPaymentMethodScreen}
        />
        <RootStack.Screen
          name={RATE_COMPANY_SCREEN}
          component={RateCompanyScreen}
        />
        <RootStack.Screen name={FEEDBACK_SCREEN} component={FeedBackScreen} />
        <RootStack.Screen
          name={NOTIFICATION_SCREEN}
          component={NotificationScreen}
        />
        <RootStack.Screen
          name={NOTIFICATION_SETTING_SCREEN}
          component={NotificatonSettingScreen}
        />
        <RootStack.Screen
          name={EDIT_PROFILE_SCREEN}
          component={EditProfileScreen}
        />
        <RootStack.Screen name={BOOKED_SCREEN} component={BookedScreen} />
        <RootStack.Screen
          name={BOOKING_DETAIL_SCREEN}
          component={BookingDetailScreen}
        />
        <RootStack.Screen
          name={BOOKED_SECTION_SCREEN}
          component={BookedSectionScreen}
        />
        <RootStack.Screen name={WHATS_NEW_SCREEN} component={WhatsNewScreen} />
        <RootStack.Screen name={DISCOUNT_SCREEN} component={DiscountScreen} />
        <RootStack.Screen
          name={DISCOUNT_DETAIL_SCREEN}
          component={DiscountDetailScreen}
        />
        <RootStack.Screen name={FAVORITES_SCREEN} component={FavoritesScreen} />
        <RootStack.Screen
          name={PROMO_CODES_SCREEN}
          component={PromoCodesScreen}
        />
        <RootStack.Screen
          name={REWARD_CREDIT_SCREEN}
          component={RewardCreditScreen}
        />
        <RootStack.Screen
          name={TERMS_POLICY_SCREEN}
          component={TermsPolicyScreen}
        />
        <RootStack.Screen
          name={HELP_CENTER_SCREEN}
          component={HelpCenterScreen}
        />
        <RootStack.Screen
          name={REGISTER_COMPLAINT_SCREEN}
          component={RegisterComplaintScreen}
        />
        <RootStack.Screen
          name={FAQ_DETAIL_SCREEN}
          component={FAQDetailScreen}
        />
        <RootStack.Screen name={PAYMENT_SCREEN} component={PaymentScreen} />
        <RootStack.Screen
          name={ADD_NEW_CARD_SCREEN}
          component={AddNewCardScreen}
        />
        <RootStack.Screen
          name={TRANSACTION_HISTORY_SCREEN}
          component={TransactionHistoryScreen}
        />
        <RootStack.Screen name={ADD_PHOTO_SCREEN} component={AddPhotoScreen} />
        <RootStack.Screen name={TIP_SCREEN} component={TipScreen} />
        <RootStack.Screen
          name={ADD_PHOTO_AFTER_SCREEN}
          component={AddPhotoAfterScreen}
        />
        <RootStack.Screen name={MEMORIES_SCREEN} component={MemoriesScreen} />
        <RootStack.Screen name={FILTER_SCREEN} component={FilterScreen} />
        <RootStack.Screen
          name={ENTER_NAME_SCREEN}
          component={EnterNameScreen}
        />
        <RootStack.Screen
          name={GUEST_SIGNUP_SCREEN}
          component={GuestSignUpScreen}
        />
        <RootStack.Screen
          name={RESET_PASSWORD_OTP_SCREEN}
          component={ResetPassOtpScreen}
        />
        <RootStack.Screen
          name={ONBOARDING_PERMISSION_SCREEN}
          component={OnBoardPermission}
        />
        <RootStack.Screen name={PROFILE_SCREEN} component={ProfileScreen} />
        <RootStack.Screen
          name={POPULARSTYLIST}
          component={PopularStylistScreen}
        />
        <RootStack.Screen name={CONFIRM_BOOK} component={Confirm_book} />
        <RootStack.Screen name={HOTORNOT} component={HotorNot} />
        <RootStack.Screen
          name={LANGAUAGESECTION}
          component={LangauageSection}
        />
        <RootStack.Screen name={ROLESELECTION} component={RoleSelection} />
        <RootStack.Screen name={MENHAIRSTYLE} component={MenHairstylesScreen} />
        <RootStack.Screen
          name={STYLECOLLECTION}
          component={StyleCollectionScreen}
        />
        <RootStack.Screen name={UPLOAD_HOT_PIC} component={UploadPicModal} />

        {/* Business */}

        <RootStack.Screen name={BREGISTER_SCREEN} component={BRegisterScreen} />
        <RootStack.Screen name={BLOGIN_SCREEN} component={BLoginScreen} />
        <RootStack.Screen name={BOTP_SCREEN} component={BOtpScreen} />
        <RootStack.Screen
          name={ENTER_EMAIL_SCREEN}
          component={EnterEmailScreen}
        />
        <RootStack.Screen
          name={BUSINESS_PROFILE_SCREEN}
          component={BusinessProfileScreen}
        />
        <RootStack.Screen
          name={BADDRESS_MAP_SCREEN}
          component={AdressMapScreen}
        />
        {hideBottomTab ? null : (
          <RootStack.Screen
            name={DASHBOARD_SCREEN}
            component={BottomTab}
            // testFun={testFun}
          />
        )}
        <RootStack.Screen
          name={NEW_BOTTOM_MANAGE_SCREEN}
          component={BottomManageScreen}
        />
        <RootStack.Screen name={BSTYLIST_SCREEN} component={StylistScreen} />
        <RootStack.Screen
          name={STYLIST_CONFIRM_APPOINTMENT}
          component={StylistConfirmAppointmentScreen}
        />
        <RootStack.Screen
          name={STYLIST_ADD_APPOINTMENT}
          component={StylistAddAppointment}
        />
        <RootStack.Screen
          name={EDIT_PROFILE_HOME}
          component={EditProfileHome}
        />
        <RootStack.Screen
          name={ADD_LOCATION_HOME}
          component={AddLocationHome}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Stack;
