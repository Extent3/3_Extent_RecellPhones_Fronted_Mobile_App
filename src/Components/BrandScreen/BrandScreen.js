import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';

import Card from '../CustomComponent/Card';
import BottomNav from '../BottomNav/BottomNav';
const recellBackIcon = require("../../Assets/BackIcon.png");
import CustomSearchInputDropdown from '../CustomComponent/CustomSearchInputDropdown';

import {
  AppleLogo,
  SamsungLogo,
  OnePlusLogo,
  XiaomiLogo,
  VivoLogo,
  OppoLogo,
  RealmeLogo,
  GoogleLogo,
  NokiaLogo,
  MotorolaLogo,
  IQOOLogo,
  NothingLogo,
  LenovoLogo,
  HonorLogo,
  PocoLogo,
  InfinixLogo,
  TecnoLogo,
  LGLogo,
  AsusLogo,
  HuaweiLogo,
} from './BrandIcons';

import { apiCall, Spinner } from '../Util/AxiosUtil';
import { API_URLS } from '../Util/AppConst';
const BRAND_LOGOS = {
  APPLE: AppleLogo,
  SAMSUNG: SamsungLogo,
  ONEPLUS: OnePlusLogo,
  XIAOMI: XiaomiLogo,
  VIVO: VivoLogo,
  OPPO: OppoLogo,
  REALME: RealmeLogo,
  GOOGLE: GoogleLogo,
  NOKIA: NokiaLogo,
  MOTOROLA: MotorolaLogo,
  IQOO: IQOOLogo,
  NOTHING: NothingLogo,
  LENOVO: LenovoLogo,
  HONOR: HonorLogo,
  POCO: PocoLogo,
  INFINIX: InfinixLogo,
  TECNO: TecnoLogo,
  LG: LGLogo,
  ASUS: AsusLogo,
  HUAWEI: HuaweiLogo,
};

export default function BrandScreen({ navigation }) {

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getBrands();
    getModels();
  }, []);

  const getBrands = () => {
    setLoading(true);
    apiCall({
      method: 'GET',
      url: API_URLS.BRANDLIST,
      callback: getBrandsCallback,
    });
  };

  const getBrandsCallback = response => {
    setLoading(false);
    if (response?.status === 200) {
      const brandList = response?.data;
      const brandData =
        brandList.map(item => ({
          ...item,
          Logo: BRAND_LOGOS[item?.name?.toUpperCase()],
        }));
      setBrands(brandData);
    } else {
      setBrands([]);
    }
  };

  const getModels = () => {
    apiCall({
      method: 'GET',
      url: API_URLS.MODELNAMELIST,
      callback: getModelsCallback,
    });
  };

  const getModelsCallback = response => {
    if (response?.status === 200) {
      setModels(response?.data);
    } else {
      setModels([]);
    }
  };

  const handleSearchChange = value => {
    setSearch(value);
  };

  const handleModelClick = model => {
    setSearch('');
    navigation.navigate(
      'DeviceDetails',
      {
        model: model?.name?.name || model?.name,
        modelId: model?._id,
        modelImage: model?.thumbnailBase64 || model?.image,
      }
    );
  };


  const renderBrand = ({ item }) => (

    <Card
      item={item}
      Logo={item.Logo}
      label={item.name}
      onPress={() =>
        navigation.navigate(
          'Model',
          {
            brand: item.name,
          }
        )
      }
    />

  );


  return (

    <SafeAreaView style={styles.container}>

      <StatusBar
        barStyle="dark-content"
      />
      {loading && <Spinner />}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Home')
            }
            style={styles.backButton}

          >
            <Image
              source={recellBackIcon}
              style={styles.backIcon}
              resizeMode="contain"
            />
           
          </TouchableOpacity>

          <Text style={styles.title}>
            Select Device
          </Text>
        </View>

        <CustomSearchInputDropdown
          placeholder="Search model..."
          options={models}
          value={search}
          onChange={handleSearchChange}
          onSelect={handleModelClick}
          getOptionLabel={item => item?.name?.name || item?.name
          }
        />
      </View>

      <View style={styles.section}>

        <Text style={styles.sectionTitle}>
          Select Brand
        </Text>

      </View>

      <FlatList
        style={styles.brandList}
        data={brands}
        keyExtractor={(item, index) =>
          item?._id?.toString() ||
          item?.name ||
          index.toString()
        }
        renderItem={renderBrand}
        numColumns={3}
        contentContainerStyle={
          styles.listContent
        }
        columnWrapperStyle={
          styles.row
        }
        showsVerticalScrollIndicator={false}
      />

      <BottomNav currentScreen="Brand" />
    </SafeAreaView>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 5,
    zIndex: 100,

  },


  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,

  },


  backButton: {
    padding: 6,
    marginRight: 12,

  },


  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },


  section: {
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 40,
    paddingTop: 16,
    paddingBottom: 12,
    zIndex: 10,

  },


  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },

  brandList: {
    flex: 1,
  },


  listContent: {
    paddingTop: 8,
    paddingBottom: 100,
  },


  row: {
    justifyContent: 'flex-start',
    paddingHorizontal: 32,

  },
  backIcon: {
    width: 42,
    height: 42,
  },

});
