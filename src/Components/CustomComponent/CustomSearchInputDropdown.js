import React, {
  useEffect,
  useState,
  useRef,
} from 'react';

import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  Modal,
  Pressable,
  findNodeHandle,
  UIManager,
} from 'react-native';

import { Search, X } from 'lucide-react-native';

const ITEM_HEIGHT = 52;
const MAX_DROPDOWN_HEIGHT = 500;

export default function CustomSearchInputDropdown({
  placeholder = 'Search...',
  options = [],
  value = '',
  onChange = () => { },
  onSelect = () => { },
  onDropdownChange = () => { },
  getOptionLabel = item => item?.name || '',
}) {
  const [inputValue, setInputValue] = useState(value || '');
  const [showDropdown, setShowDropdown] = useState(false);

  const [inputPosition, setInputPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const searchContainerRef = useRef(null);
  const modalInputRef = useRef(null);

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);


  const filteredOptions = Array.isArray(options)
    ? options.filter(item => {
      const label = getOptionLabel(item);

      return String(label || '')
        .toLowerCase()
        .includes(
          inputValue.toLowerCase().trim(),
        );
    })
    : [];


  const dropdownHeight =
    filteredOptions.length === 0
      ? 60
      : Math.min(
        filteredOptions.length * ITEM_HEIGHT,
        MAX_DROPDOWN_HEIGHT,
      );


  const openDropdown = () => {
    const node = findNodeHandle(
      searchContainerRef.current,
    );

    if (!node) {
      return;
    }

    UIManager.measureInWindow(
      node,
      (x, y, width, height) => {
        setInputPosition({
          x,
          y,
          width,
          height,
        });

        setShowDropdown(true);

        onDropdownChange(true);

        setTimeout(() => {
          modalInputRef.current?.focus();
        }, 200);
      },
    );
  };


  const closeDropdown = () => {
    setShowDropdown(false);

    onDropdownChange(false);

    Keyboard.dismiss();
  };


  const handleChange = text => {
    setInputValue(text);

    onChange(text);
  };


  const handleSelect = item => {
    const selectedValue =
      getOptionLabel(item);

    setInputValue(selectedValue);

    onChange(selectedValue);

    setShowDropdown(false);

    onDropdownChange(false);

    Keyboard.dismiss();

    onSelect(item);
  };


  const handleClose = () => {
    setShowDropdown(false);
    onDropdownChange(false);
    Keyboard.dismiss();
  };


  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={openDropdown}
      >
        <View
          ref={searchContainerRef}
          style={styles.searchContainer}
          pointerEvents="none"
        >
          <Search
            size={18}
            color="#9CA3AF"
            style={styles.searchIcon}
          />

          <TextInput
            value={inputValue}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            editable={false}
          />
        </View>
      </TouchableOpacity>

      <Modal
        visible={showDropdown}
        transparent
        animationType="none"
        onRequestClose={closeDropdown}
      >
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.backdrop}
            onPress={closeDropdown}
          />
          <View
            style={[
              styles.modalSearchContainer,
              {
                top: inputPosition.y,
                left: inputPosition.x,
                width: inputPosition.width,
              },
            ]}
          >
            <Search
              size={18}
              color="#9CA3AF"
              style={styles.searchIcon}
            />

            <TextInput
              ref={modalInputRef}
              value={inputValue}
              onChangeText={handleChange}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
              blurOnSubmit={false}
            />

            <TouchableOpacity
              style={styles.closeButton}
              activeOpacity={0.7}
              onPress={handleClose}
            >
              <X
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.dropdown,
              {
                top:
                  inputPosition.y +
                  inputPosition.height +
                  6,

                left: inputPosition.x,

                width: inputPosition.width,

                height: dropdownHeight,
              },
            ]}
          >

            {filteredOptions.length > 0 ? (

              <FlatList
                data={filteredOptions}

                keyExtractor={(item, index) =>
                  item?._id?.toString() ||
                  index.toString()
                }

                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.option}
                    onPress={() =>
                      handleSelect(item)
                    }
                  >
                    <Text
                      style={styles.optionText}
                    >
                      {getOptionLabel(item)}
                    </Text>
                  </TouchableOpacity>
                )}

                style={styles.flatList}

                scrollEnabled={true}

                nestedScrollEnabled={true}

                showsVerticalScrollIndicator={true}

                persistentScrollbar={true}

                keyboardShouldPersistTaps="always"

                keyboardDismissMode="none"

                bounces={true}

                removeClippedSubviews={false}
              />

            ) : (

              <View
                style={styles.emptyContainer}
              >
                <Text
                  style={styles.emptyText}
                >
                  No model found
                </Text>
              </View>

            )}

          </View>

        </View>

      </Modal>

    </>
  );
}


const styles = StyleSheet.create({

  searchContainer: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
  },


  modalContainer: {
    flex: 1,
  },


  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },


  modalSearchContainer: {
    position: 'absolute',
    height: 48,
    justifyContent: 'center',
    zIndex: 10,
    elevation: 10,
  },


  searchIcon: {
    position: 'absolute',
    left: 14,
    zIndex: 2,
  },


  input: {
    width: '100%',
    height: 48,
    paddingLeft: 42,
    paddingRight: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    fontSize: 14,
    color: '#1F2937',
  },

   closeButton: {
    position: 'absolute',
    right: 6,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    elevation: 20,

  },


  dropdown: {
    position: 'absolute',

    backgroundColor: '#FFFFFF',

    borderWidth: 1,
    borderColor: '#E5E7EB',

    borderRadius: 12,

    overflow: 'hidden',

    zIndex: 100,
    elevation: 100,

    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.2,

    shadowRadius: 8,
  },


  flatList: {
    flex: 1,
  },


  option: {
    height: ITEM_HEIGHT,

    paddingHorizontal: 16,

    justifyContent: 'center',

    borderBottomWidth: 1,

    borderBottomColor: '#F3F4F6',
  },


  optionText: {
    fontSize: 14,
    color: '#1F2937',
  },


  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
  },

});