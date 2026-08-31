import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Package, Truck, CheckCircle } from 'lucide-react-native';
// import BottomNav from '../BottomNav/BottomNav'

export default function OrderScreen({ navigation }) {
  const orders = [
    {
      id: 'ORD001',
      device: 'iPhone 12',
      condition: 'Good',
      amount: '₹26,500',
      status: 'Completed',
      date: 'Mar 20, 2026',
      icon: CheckCircle,
      color: '#0D8A4F',
    },
    {
      id: 'ORD002',
      device: 'Samsung S21',
      condition: 'Like New',
      amount: '₹18,500',
      status: 'In Transit',
      date: 'Mar 22, 2026',
      icon: Truck,
      color: '#F59E0B',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Orders</Text>
        <Text style={styles.headerSubtitle}>Track your device sales</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Orders List */}
        {orders.map((order) => {
          const Icon = order.icon;
          return (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderRow}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: order.color + '15' },
                  ]}
                >
                  <Icon size={24} color={order.color} />
                </View>
                <View style={styles.orderInfo}>
                  <View style={styles.orderTopRow}>
                    <Text style={styles.deviceName}>{order.device}</Text>
                    <Text style={styles.amount}>{order.amount}</Text>
                  </View>
                  <Text style={styles.conditionDate}>
                    {order.condition} • {order.date}
                  </Text>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: order.color + '15' },
                    ]}
                  >
                    <Text style={[styles.statusText, { color: order.color }]}>
                      {order.status}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('PriceScreen')}
                style={styles.detailsButton}
                activeOpacity={0.7}
              >
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          );
        })}

        {/* Empty State (if no orders) */}
        {orders.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Package size={40} color="#9CA3AF" />
            </View>
            <Text style={styles.emptyText}>No orders yet</Text>
            <TouchableOpacity
              onPress={() => onNavigate('home')}
              style={styles.startSellingButton}
              activeOpacity={0.8}
            >
              <Text style={styles.startSellingText}>Start Selling</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* <BottomNav currentScreen="OrderScreen" /> */}
    </View>
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
    paddingTop: 48,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 100,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  deviceName: {
    fontWeight: 'bold',
    color: '#1F2937',
    fontSize: 15,
  },
  amount: {
    color: '#0D8A4F',
    fontWeight: 'bold',
    fontSize: 15,
  },
  conditionDate: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  detailsButton: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    backgroundColor: '#F3F4F6',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyText: {
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    fontSize: 15,
  },
  startSellingButton: {
    backgroundColor: '#0D8A4F',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  startSellingText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
});