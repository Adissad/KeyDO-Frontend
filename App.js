import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import StartScreen from './screens/StartScreen';
import ConnexionScreen from './screens/ConnexionScreen';
import SpotifyRedirectionScreen from './screens/SpotifyRedirectionScreen';
import AppleRedirectionScreen from './screens/AppleRedirectionScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';
import MatchScreen from './screens/MatchScreen';
import ConvScreen from './screens/ConvScreen';
import ChatScreen from './screens/ChatScreen';
import RemyChatScreen from './screens/RemyChatScreen';
import MasiChatScreen from './screens/MasiChatScreen';
import SettingsScreen from './screens/SettingsScreen';

import DanceScreen from './screens/GenresMusic/DanceScreen';
import RnBScreen from './screens/GenresMusic/RnBScreen';
import HipHopScreen from './screens/GenresMusic/HipHopScreen';
import LatinoScreen from './screens/GenresMusic/LatinoScreen';
import JazzScreen from './screens/GenresMusic/JazzScreen';
import SoulScreen from './screens/GenresMusic/SoulScreen';
import RockScreen from './screens/GenresMusic/RockScreen';
import ClassiqueScreen from './screens/GenresMusic/ClassiqueScreen';
import ReggaeScreen from './screens/GenresMusic/ReggaeScreen';
import PopScreen from './screens/GenresMusic/PopScreen';
import FrenchScreen from './screens/GenresMusic/FrenchScreen';
import KpopScreen from './screens/GenresMusic/KpopScreen';
import MétalScreen from './screens/GenresMusic/MétalScreen';
import FunkScreen from './screens/GenresMusic/FunkScreen';
import FolkScreen from './screens/GenresMusic/FolkScreen';
import BluesScreen from './screens/GenresMusic/BluesScreen';
import CountryScreen from './screens/GenresMusic/CountryScreen';
import AfroScreen from './screens/GenresMusic/AfroScreen';
import DécenniesScreen from './screens/GenresMusic/DécenniesScreen';
import GospelScreen from './screens/GenresMusic/GospelScreen';

import { Ionicons } from '@expo/vector-icons';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import token from './reducers/token';

const store = createStore(combineReducers({ token }));

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name == 'Home') {
            iconName = 'home-outline';
          } else if (route.name == 'Match') {
            iconName = 'heart-outline';
          }
          else if (route.name == 'Conv') {
            iconName = 'chatbubbles-outline';
          }
          if (route.name == 'Profile') {
            iconName = 'person-outline';
          }
          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        showIcon: true,
        showLabel: false,
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#66F',
        style: {
          backgroundColor: '#693192',
          opacity: 0.9,
          borderTopWidth: 0,
          position: 'absolute',
          elevation: 0
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Match" component={MatchScreen} />
      <Tab.Screen name="Conv" component={ConvScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Start" component={StartScreen} />
					<Stack.Screen name="Connexion" component={ConnexionScreen} />
					<Stack.Screen name="Spotify" component={SpotifyRedirectionScreen} />
					<Stack.Screen name="Apple" component={AppleRedirectionScreen} />
					<Stack.Screen name="Profile" component={ProfileScreen} />
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Chat" component={ChatScreen} />
					<Stack.Screen name="BottomNavigator" component={BottomNavigator} />
					<Stack.Screen name="Masi" component={MasiChatScreen} />
					<Stack.Screen name="Remy" component={RemyChatScreen} />
					<Stack.Screen name="Dance" component={DanceScreen} />
					<Stack.Screen name="RnB" component={RnBScreen} />
					<Stack.Screen name="HipHop" component={HipHopScreen} />
					<Stack.Screen name="Latino" component={LatinoScreen} />
					<Stack.Screen name="Jazz" component={JazzScreen} />
					<Stack.Screen name="Soul" component={SoulScreen} />
					<Stack.Screen name="Rock" component={RockScreen} />
					<Stack.Screen name="Classique" component={ClassiqueScreen} />
					<Stack.Screen name="Reggae/Dancehall" component={ReggaeScreen} />
					<Stack.Screen name="Pop" component={PopScreen} />
					<Stack.Screen name="French" component={FrenchScreen} />
					<Stack.Screen name="Kpop" component={KpopScreen} />
					<Stack.Screen name="Métal" component={MétalScreen} />
					<Stack.Screen name="Funk" component={FunkScreen} />
					<Stack.Screen name="Folk" component={FolkScreen} />
					<Stack.Screen name="Blues" component={BluesScreen} />
					<Stack.Screen name="Country" component={CountryScreen} />
					<Stack.Screen name="Afro" component={AfroScreen} />
					<Stack.Screen name="Décennies" component={DécenniesScreen} />
					<Stack.Screen name="Gospel" component={GospelScreen} />
					<Stack.Screen name="Settings" component={SettingsScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
  );
};