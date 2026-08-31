import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export default function Card({
  item,
  onPress,
  Logo,
  label,
  image,
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrap}>
        
        {Logo ? (
          <Logo width={40} height={40} />

        ) : image ? (

          /* API Model Image */
          <Image
              source={{ uri: image }}
              style={styles.image}
            resizeMode="contain"
            onError={(error) => {
              console.log(
                'Image Load Error:',
                error.nativeEvent
              );
            }}
          />

        ) : null}

      </View>

      <Text style={styles.label}>
        {label || item?.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1 / 3,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },

  iconWrap: {
    width: 56,
    height: 56,
    // width: 80,
    // height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
  },

  image: {
    width: 40,
    height: 40,
  },

  label: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    width: '100%',
    lineHeight: 16,
    minHeight: 32,
  },
});