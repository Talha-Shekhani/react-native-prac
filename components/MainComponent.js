import React, { Component } from 'react'
import Dishdetail from './DishDetailComponent';
import Reservation from './ReservationComponent'
import Favorites from './FavoritesComponent'
import Home from './HomeComponent'  
import Login from './LoginComponent'
import About from './AboutComponent';
import Menu from './MenuComponent'
import Contact from './ContactComponent';
import { View, Platform, Text, Image, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import NetInfo from '@react-native-community/netinfo'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { createAppContainer, SafeAreaView } from 'react-navigation'
import { Icon } from 'react-native-elements'
import { fetchDishes, fetchComments, fetchLeaders, fetchPromos } from '../redux/ActionCreators'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchPromos: () => dispatch(fetchPromos()),
})

const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu,
  navigationOptions: ({ navigation }) => ({
    headerLeft: () => <Icon name="menu" size={24} color='white' onPress={() => navigation.toggleDrawer()} />
  })},
  Dishdetail: { screen: Dishdetail}
},{
  initialRouteName: 'Menu',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    }
  }
})

const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
},{
  defaultNavigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    },
    headerLeft: () => <Icon name="menu" size={24} color='white' onPress={() => navigation.toggleDrawer()} />
  })
})

const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact }
},{
  defaultNavigationOptions: ({ navigation }) => ({
    title: 'Contact Us',
    headerStyle: {
      backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    },
    headerLeft: () => <Icon name="menu" size={24} color='white' onPress={() => navigation.toggleDrawer()} />
  })
})

const AboutNavigator = createStackNavigator({
  About: { screen: About }
},{
  defaultNavigationOptions: ({ navigation }) => ({
    title: 'About Us',
    headerStyle: {
      backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    },
    headerLeft: () => <Icon name="menu" size={24} color='white' onPress={() => navigation.toggleDrawer()} />
  })
})

const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation }
},{
  defaultNavigationOptions: ({ navigation }) => ({
    title: 'Reserve Table',
    headerStyle: {
      backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    },
    headerLeft: () => <Icon name="menu" size={24} color='white' onPress={() => navigation.toggleDrawer()} />
  })
})

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites }
},{
  defaultNavigationOptions: ({ navigation }) => ({
    title: 'Favorites',
    headerStyle: {
      backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    },
    headerLeft: () => <Icon name="menu" size={24} color='white' onPress={() => navigation.toggleDrawer()} />
  })
})

const LoginNavigator = createStackNavigator({
  Login: { screen: Login }
},{
  defaultNavigationOptions: ({ navigation }) => ({
    title: 'Login',
    headerStyle: {
      backgroundColor: '#512DA8'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    },
    headerLeft: () => <Icon name="menu" size={24} color='white' onPress={() => navigation.toggleDrawer()} />
  })
})

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={styles.container} 
      forceInset={{top: 'always', horizontal: 'never'}} >
      <View style={styles.drawerHeader}>
        <View style={{flex: 1}}>
          <Image source={require('./images/logo.png')} style={styles.DrawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.DrawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
)
const MainNavigator = createDrawerNavigator({
  Login: { screen: LoginNavigator,
    navigationOptions: {
      title: 'Login',
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor }) => (
        <Icon name='sign-in' type='font-awesome' size={24} color={tintColor} />
      )
    }},
  Home: { screen: HomeNavigator,
          navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
              <Icon name='home' type='font-awesome' size={24} color={tintColor} />
            )
    }},
  About: { screen: AboutNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor }) => (
        <Icon name='info-circle' type='font-awesome' size={24} color={tintColor} />
      )
    }},
  Menu: { screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu',
      drawerIcon: ({ tintColor }) => (
        <Icon name='list' type='font-awesome' size={24} color={tintColor} />
      )
    }},
  Contact: { screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us',
      drawerIcon: ({ tintColor }) => (
        <Icon name='address-card' type='font-awesome' size={22} color={tintColor} />
      )
    }},
  Favorites: { screen: FavoritesNavigator,
      navigationOptions: {
        title: 'My Favorites',
        drawerLabel: 'Favorites',
        drawerIcon: ({ tintColor }) => (
          <Icon name='heart' type='font-awesome' size={24} color={tintColor} />
        )
      }},
  Reservation: { screen: ReservationNavigator,
    navigationOptions: {
      title: 'Reserve Table',
      drawerLabel: 'Reserve Table',
      drawerIcon: ({ tintColor }) => (
        <Icon name='cutlery' type='font-awesome' size={24} color={tintColor} />
      )
    }}
},{
  initialRouteName: 'Home',
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
})

class Main extends Component {

  UNSAFE_componentWillMount () {
    this.props.fetchDishes()
    this.props.fetchComments()
    this.props.fetchLeaders()
    this.props.fetchPromos()
    NetInfo.fetch().then(state => {
      ToastAndroid.show('ٰInitial Network Connectivity Type: ' + state.type, ToastAndroid.LONG)
    })
    NetInfo.addEventListener(state => {
      this.handleConnectivityChange(state)
    })
  }

  componentWillUnmount() {
    NetInfo.addEventListener(state => {
      this.handleConnectivityChange(state)
    })
  }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show('You are now Offline!', ToastAndroid.LONG)
        break
      case 'wifi':
        ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG)
        break
      case 'cellular':
        ToastAndroid.show('You are now connected to cellular!', ToastAndroid.LONG)
        break
      case 'unknown':
        ToastAndroid.show('You now have an unknown connection!', ToastAndroid.LONG)
        break
      default:
        break
    }
  }

  render() {
    const App = createAppContainer(MainNavigator)
    return (
        <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? Expo.Constants.statusBarHeight : 0 }}>
            <App />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  DrawerHeaderText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold'
  },
  DrawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Main)