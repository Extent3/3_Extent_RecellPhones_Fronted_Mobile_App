import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  ChevronLeft,
  CheckCircle,
  Truck,
  Clock,
  Shield,
} from 'lucide-react-native';

import BottomNav from '../BottomNav/BottomNav'
export default function PriceScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Green Success Header */}
        <LinearGradient
          colors={['#0D8A4F', '#0A6E3F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <TouchableOpacity
            onPress={() => onNavigate('condition-assessment')}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <View style={styles.successIconCircle}>
              <CheckCircle size={48} color="#0D8A4F" />
            </View>
            <Text style={styles.headerTitle}>Payment Complete!</Text>
          </View>
        </LinearGradient>

        {/* Price Card - Overlapping */}
        <View style={styles.priceCardWrapper}>
          <View style={styles.priceCard}>
            <View style={styles.amountSection}>
              <Text style={styles.amountLabel}>Amount</Text>
              <Text style={styles.amountValue}>₹26,500</Text>
              <Text style={styles.amountSubtext}>Sent to Your Account!</Text>
            </View>

            <View style={styles.actionsSection}>
              <Text style={styles.confirmationText}>
                Your payment has been transferred successfully.
              </Text>

              {/* Action Buttons */}
              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <View style={styles.actionButtonLeft}>
                  <View style={styles.actionIconContainer}>
                    <Shield size={20} color="#0D8A4F" />
                  </View>
                  <Text style={styles.actionLabel}>Transfer Details</Text>
                </View>
                <ChevronLeft
                  size={20}
                  color="#9CA3AF"
                  style={{ transform: [{ rotate: '180deg' }] }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => onNavigate('orders')}
                style={styles.actionButton}
                activeOpacity={0.7}
              >
                <View style={styles.actionButtonLeft}>
                  <View style={styles.actionIconContainer}>
                    <Truck size={20} color="#0D8A4F" />
                  </View>
                  <Text style={styles.actionLabel}>Request Another Pickup</Text>
                </View>
                <ChevronLeft
                  size={20}
                  color="#9CA3AF"
                  style={{ transform: [{ rotate: '180deg' }] }}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
                <View style={styles.actionButtonLeft}>
                  <View style={styles.actionIconContainer}>
                    <Clock size={20} color="#0D8A4F" />
                  </View>
                  <Text style={styles.actionLabel}>Buy Refurbished Devices</Text>
                </View>
                <ChevronLeft
                  size={20}
                  color="#9CA3AF"
                  style={{ transform: [{ rotate: '180deg' }] }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Order Summary Section */}
        <View style={styles.summaryWrapper}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <View style={styles.summaryRows}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Device Sold:</Text>
                <Text style={styles.summaryValue}>iPhone 12</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Condition:</Text>
                <Text style={styles.summaryValue}>Good</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Your Offer:</Text>
                <Text style={styles.summaryValueGreen}>₹26,500</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Pickup Scheduled:</Text>
                <Text style={styles.summaryValue}>Tomorrow, 2:00 PM</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Payment Method:</Text>
                <Text style={styles.summaryValue}>Instant Bank Transfer</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Browse Deals Button - fixed above BottomNav */}
      <LinearGradient
        colors={['transparent', '#F9FAFB', '#F9FAFB']}
        style={styles.browseDealsFade}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          onPress={() => onNavigate('home')}
          style={styles.browseDealsButton}
          activeOpacity={0.85}
        >
          <Text style={styles.browseDealsText}>Browse Deals</Text>
          <ChevronLeft
            size={20}
            color="#FFFFFF"
            style={{ transform: [{ rotate: '180deg' }] }}
          />
        </TouchableOpacity>
      </LinearGradient>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 220,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 80,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
    padding: 8,
    borderRadius: 999,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 32,
  },
  successIconCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  priceCardWrapper: {
    paddingHorizontal: 24,
    marginTop: -48,
  },
  priceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  amountSection: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingBottom: 16,
    marginBottom: 16,
  },
  amountLabel: {
    color: '#6B7280',
    fontSize: 13,
    marginBottom: 4,
  },
  amountValue: {
    color: '#0D8A4F',
    fontSize: 42,
    fontWeight: 'bold',
  },
  amountSubtext: {
    color: '#4B5563',
    fontSize: 13,
    marginTop: 4,
  },
  actionsSection: {
    gap: 12,
  },
  confirmationText: {
    color: '#374151',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  actionButton: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  actionButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(13,138,79,0.1)',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionLabel: {
    color: '#1F2937',
    fontWeight: '500',
    fontSize: 13,
  },
  summaryWrapper: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  summaryRows: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    color: '#6B7280',
    fontSize: 13,
  },
  summaryValue: {
    color: '#1F2937',
    fontWeight: '600',
    fontSize: 13,
  },
  summaryValueGreen: {
    color: '#0D8A4F',
    fontWeight: 'bold',
    fontSize: 13,
  },
  browseDealsFade: {
    position: 'absolute',
    bottom: 64,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  browseDealsButton: {
    width: '100%',
    backgroundColor: '#0D8A4F',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  browseDealsText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});