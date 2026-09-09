import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  House,
  Search,
  ShoppingBag,
  User,
} from 'lucide-react-native';

import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


export default function BottomNav({ currentScreen }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const navItems = [
    {
      label: 'Home',
      screen: 'Home',
      icon: House,
    },
    {
      label: 'Explore',
      screen: 'Brand',
      icon: Search,
    },
    {
      label: 'Orders',
      screen: 'OrderScreen',
      icon: ShoppingBag,
    },
    {
      label: 'Profile',
      screen: 'Profile',
      icon: User,
    },
  ];

  return (
    <View style={[
      styles.container,
      {
        height: 75 + insets.bottom,
        paddingBottom: insets.bottom,
      },
    ]}>
      {navItems.map((item) => {
        const active = currentScreen === item.screen;
        const Icon = item.icon;

        return (
          <TouchableOpacity
            key={item.screen}
            style={styles.item}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Icon
              size={24}
              color={active ? '#0D8A4F' : '#9CA3AF'}
              strokeWidth={2.2}
            />

            <Text
              style={[
                styles.label,
                active && styles.activeLabel,
              ]}
            >
              {item.label}
            </Text>

            {active && <View style={styles.activeDot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',

    elevation: 15,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  item: {
    flex: 1,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },

  label: {
    marginTop: 4,
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },

  activeLabel: {
    color: '#0D8A4F',
    fontWeight: '700',
  },

  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#0D8A4F',
    marginTop: 4,
  },
});