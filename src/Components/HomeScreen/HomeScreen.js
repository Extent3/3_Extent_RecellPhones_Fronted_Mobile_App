import React, { useEffect, useState } from 'react';
import BottomNav from '../BottomNav/BottomNav'
import Card from '../CustomComponent/Card';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Smartphone, TrendingUp, Zap, UserCircle } from 'lucide-react-native';


const logoImage = require('../../Assets/ExtentLogo.png');
const { width } = Dimensions.get('window');

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
  HuaweiLogo
} from '../BrandScreen/BrandIcons';
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
  Asus: AsusLogo,
  Huawei: HuaweiLogo,
};
// const brands = [
//   {
//     name: 'Apple',
//     Logo: AppleLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Samsung',
//     Logo: SamsungLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'OnePlus',
//     Logo: OnePlusLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Xiaomi',
//     Logo: XiaomiLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Vivo',
//     Logo: VivoLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Oppo',
//     Logo: OppoLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Realme',
//     Logo: RealmeLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Google',
//     Logo: GoogleLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Nokia',
//     Logo: NokiaLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Motorola',
//     Logo: MotorolaLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'iQOO',
//     Logo: IQOOLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Nothing',
//     Logo: NothingLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Lenovo',
//     Logo: LenovoLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Honor',
//     Logo: HonorLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'POCO',
//     Logo: PocoLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Infinix',
//     Logo: InfinixLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Tecno',
//     Logo: TecnoLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'LG',
//     Logo: LGLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Asus',
//     Logo: AsusLogo,
//     screen: 'model-selection',
//   },
//   {
//     name: 'Huawei',
//     Logo: HuaweiLogo,
//     screen: 'model-selection',
//   },
// ];


const features = [
  { icon: Smartphone, title: 'Sell Device', desc: 'Quick pickup' },
  { icon: TrendingUp, title: 'Best Price', desc: 'Top value' },
  { icon: Zap, title: 'Instant Pay', desc: 'Secure' },
];

const offers = [
  {
    name: 'Samsung S23',
    price: '₹18,500',
    image:
      'https://images.unsplash.com/photo-1758348844311-30248208fa02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    name: 'iPhone 12',
    price: '₹27,999',
    image:
      'https://images.unsplash.com/photo-1758348844311-30248208fa02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
];



export default function HomeScreen({ navigation }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBrands();
  }, []);

  const getBrands = async () => {

    setLoading(true);

    try {

      const response = await new Promise((resolve) => {

        apiCall({
          method: 'GET',
          url: API_URLS.BRANDLIST,
          callback: resolve,
        });

      });

      console.log('BRAND LIST RESPONSE:', response);

      const brandData = response?.data || [];

      const brandsWithLogo = brandData.map(item => ({
        ...item,
        Logo: BRAND_LOGOS[item?.name] || null,
      }));

      setBrands(brandsWithLogo);

    } catch (error) {

      console.log('BRANDS ERROR:', error);

      setBrands([]);

    } finally {

      setLoading(false);

    }
  };
  return (
    <View style={styles.mainContainer}>
      {loading && <Spinner />}
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Green Header with Gradient */}
        <LinearGradient
          colors={['#0D8A4F', '#0A6E3F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.topBar}>
            {/* Left Side */}
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Image
                  source={logoImage}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.logoTextContainer}>
                <Text style={styles.logoTitle}>3_EXTENT</Text>
                <Text style={styles.logoSubtitle}>
                  Buy & Sell Used Devices
                </Text>
              </View>
            </View>

            {/* Right Side */}
            <TouchableOpacity style={styles.avatarCircle}>
              <UserCircle size={28} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.greeting}>Hi, User!</Text>
          <Text style={styles.subGreeting}>Sell your old devices for the best price.</Text>

          {/* Quick Actions */}
          <View style={styles.quickActionsRow}>
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <TouchableOpacity key={feature.title} style={styles.quickActionButton}>
                  <View style={styles.quickActionIconWrap}>
                    <Icon size={20} color="#0D8A4F" />
                  </View>
                  <Text style={styles.quickActionTitle}>{feature.title}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </LinearGradient>

        {/* Get Instant Cash Banner */}
        <View style={styles.bannerWrap}>
          <TouchableOpacity activeOpacity={0.9}>
            <LinearGradient
              colors={['#0D8A4F', '#0A6E3F']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.banner}
            >
              <View style={styles.bannerTextWrap}>
                <Text style={styles.bannerTitle}>Get Instant Cash</Text>
                <Text style={styles.bannerSubtitle}>for Your Old Phone</Text>
                <Text style={styles.bannerNote}>Free Pickup • Quick Payment</Text>
                <TouchableOpacity style={styles.sellNowButton} onPress={() => navigation.navigate('Brand')}>
                  <Text style={styles.sellNowButtonText}>Sell Now</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{
                  uri:
                    'https://images.unsplash.com/photo-1772793900268-1834cf0ad573?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
                }}
                style={styles.bannerImage}
                resizeMode="contain"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Top Offers Section */}
        <View style={[styles.section]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Top Offers</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
            {offers.map((offer, idx) => (
              <TouchableOpacity key={idx} style={styles.offerCard} activeOpacity={0.9}>
                <View style={styles.offerImageWrap}>
                  <Image
                    source={{ uri: offer.image }}
                    style={styles.offerImage}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.offerPrice}>{offer.price}</Text>
                <Text style={styles.offerName}>{offer.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Brands */}
        {/* <View style={[styles.section, { paddingBottom: 24 }]}>
          <Text style={styles.sectionTitle}>Popular Brands</Text>
          <View style={styles.brandsCard}>
            <View style={styles.brandsGrid}>
              {brands.map((brand) => (
                <TouchableOpacity key={brand.name} style={styles.brandItem} onPress={() =>
                  navigation.replace('Brand')
                }>
                  <View style={styles.brandIconWrap}>
                    <Text style={styles.brandIconText}>{brand.icon}</Text>
                  </View>
                  <Text style={styles.brandName}>{brand.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </View> */}

        <View style={[styles.section, { paddingBottom: 24 }]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Popular Brands</Text>

            <TouchableOpacity onPress={() => navigation.navigate('Brand')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.brandsCard}>
            <View style={styles.brandsGrid}>
              {brands.slice(0, 4).map((brand) => (
                <Card
                  key={brand.name}
                  item={brand}
                  Logo={brand.Logo}
                  label={brand.name}
                  onPress={(item) =>
                    navigation.navigate('Model', {
                      brand: item.name,
                    })
                  }
                />
              ))}
            </View>
          </View>
        </View>


      </ScrollView>
      <BottomNav currentScreen="Home" />
    </View>

  );
}

const CARD_WIDTH = (width - 48 - 12 * 3) / 5;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 30,

    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,

    elevation: 8,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImage: {
    width: 42,
    height: 42,
  },

  logoTextContainer: {
    marginLeft: 12,
  },

  logoTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  logoSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  greeting: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },

  subGreeting: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    marginBottom: 24,
  },

  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  quickActionButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  quickActionIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  quickActionTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },

  bannerWrap: {
    paddingHorizontal: 24,
    marginTop: -24,
    marginBottom: 24,
  },
  banner: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    marginBottom: 12,
  },
  bannerNote: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    marginBottom: 12,
  },
  sellNowButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  sellNowButtonText: {
    color: '#0D8A4F',
    fontSize: 14,
    fontWeight: '600',
  },
  bannerImage: {
    width: 96,
    height: 96,
    borderRadius: 12,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  viewAllText: {
    color: '#0D8A4F',
    fontSize: 14,
    fontWeight: '600',
  },
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    minWidth: 140,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  offerImageWrap: {
    width: '100%',
    height: 96,
    backgroundColor: '#ECFDF5',
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  offerImage: {
    width: 64,
    height: 64,
  },
  offerPrice: {
    color: '#0D8A4F',
    fontWeight: '700',
    fontSize: 18,
  },
  offerName: {
    color: '#4B5563',
    fontSize: 12,
    fontWeight: '500',
  },
  brandsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  brandItem: {
    width: CARD_WIDTH,
    alignItems: 'center',
    gap: 8,
  },
  brandIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  brandIconText: {
    fontSize: 22,
  },
  brandName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },

  scrollContent: {
    paddingBottom: 10,
  },

  //   brandsGrid: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  // },
  // brandsCard: {
  //   backgroundColor: '#fff',
  //   borderRadius: 16,
  //   padding: 8,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.08,
  //   shadowRadius: 6,
  //   elevation: 3,
  // // },
  // brandsCard: {
  //   backgroundColor: '#fff',
  //   borderRadius: 16,
  //   padding: 16,
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.08,
  //   shadowRadius: 6,
  //   elevation: 3,
  // },

  // brandsGrid: {
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-between',
  // },
});