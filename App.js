import React from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import NativeTachyons, { styles as s } from 'react-native-style-tachyons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import Footer from './Footer'
import BarAnimation from './BarAnimation'

NativeTachyons.build(
  {
    /* REM parameter is optional, default is 16 */
    rem: Dimensions.get('screen').width > 340 ? 18 : 16,
    /* fontRem parameter is optional to allow adjustment in font-scaling. default falls back to rem */
    fontRem: 8,
  },
  StyleSheet
)

class TabNavigation extends React.Component {
  render() {
    const { navigation } = this.props
    const { index, routes } = navigation.state
    const tabIcons = ['cup', 'calendar', 'basket', 'bell']
    const tabColors = ['#112F41', '#068587', '#F2B134', '#ED553B']
    const tabWidth = [90, 110, 105, 125]
    return (
      <Footer>
        {routes.map((route, i) => {
          if (i === index) {
            return (
              <BarAnimation
                {...this.props}
                key={route.key}
                onPress={() => this.props.navigation.navigate(route.routeName)}
                label={route.key}
                color={tabColors[i]}
                tabWidth={tabWidth[i]}
                renderIcon={() => (
                  <SimpleLineIcons name={tabIcons[i]} size={16} color={tabColors[i]} />
                )}
              />
            )
          } else {
            return (
              <TouchableOpacity
                style={[s.ph3]}
                key={route.key}
                onPress={() => this.props.navigation.navigate(route.routeName)}
              >
                <SimpleLineIcons name={tabIcons[i]} size={16} color="#0C202D" />
              </TouchableOpacity>
            )
          }
        })}
      </Footer>
    )
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={[s.flx_i, s.jcc, s.aic]}>
        <Text>Home!</Text>
      </View>
    )
  }
}

class BookingsScreen extends React.Component {
  render() {
    return (
      <View style={[s.flx_i, s.jcc, s.aic]}>
        <Text>Bookings!</Text>
      </View>
    )
  }
}

class WishlistScreen extends React.Component {
  render() {
    return (
      <View style={[s.flx_i, s.jcc, s.aic]}>
        <Text>Wishlist!</Text>
      </View>
    )
  }
}

class NotificationsScreen extends React.Component {
  render() {
    return (
      <View style={[s.flx_i, s.jcc, s.aic]}>
        <Text>Notifications!</Text>
      </View>
    )
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Bookings: BookingsScreen,
    Wishlists: WishlistScreen,
    Notifications: NotificationsScreen,
  },
  {
    tabBarComponent: (props) => <TabNavigation {...props} />,
    tabBarOptions: {
      showLabel: false,
    },
  }
)

export default createAppContainer(TabNavigator)
