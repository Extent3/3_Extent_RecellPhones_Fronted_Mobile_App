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
  User,
  Bell,
  HelpCircle,
  Shield,
  LogOut,
  ChevronLeft,
  Settings,
  GitBranch,
} from 'lucide-react-native';
import BottomNav from '../BottomNav/BottomNav'

export default function ProfileScreen({ navigation }) {
  const menuItems = [
    { icon: Settings, label: 'Account Settings', color: '#0D8A4F' },
    { icon: Bell, label: 'Notifications', color: '#3B82F6' },
    {
      icon: GitBranch,
      label: 'View Flow Diagram',
      color: '#8B5CF6',
      action: 'flow-diagram',
    },
    { icon: HelpCircle, label: 'Help & Support', color: '#F59E0B' },
    { icon: Shield, label: 'Privacy & Security', color: '#8B5CF6' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Green Header with Profile */}
        <LinearGradient
          colors={['#0D8A4F', '#0A6E3F']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>Profile</Text>

          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileRow}>
              <View style={styles.avatarCircle}>
                <User size={32} color="#0D8A4F" />
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>Aman Singh</Text>
                <Text style={styles.profileEmail}>aman@example.com</Text>
                <Text style={styles.profilePhone}>+91 9876543210</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsWrapper}>
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Devices Sold</Text>
            </View>
            <View style={[styles.statItem, styles.statItemBordered]}>
              <Text style={styles.statValue}>₹65K</Text>
              <Text style={styles.statLabel}>Total Earned</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5.0</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuWrapper}>
          <View style={styles.menuCard}>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isLast = index === menuItems.length - 1;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => item.action && onNavigate(item.action)}
                  style={[
                    styles.menuItem,
                    !isLast && styles.menuItemBorder,
                  ]}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.menuIconContainer,
                      { backgroundColor: `${item.color}15` },
                    ]}
                  >
                    <Icon color={item.color} size={20} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <ChevronLeft
                    color="#9CA3AF"
                    size={20}
                    style={{ transform: [{ rotate: '180deg' }] }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutWrapper}>
          <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
            <LogOut size={20} color="#DC2626" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* App Version */}
        <View style={styles.versionWrapper}>
          <Text style={styles.versionText}>3_EXTENT v1.0.0</Text>
          <Text style={styles.versionSubtext}>
            Made with ❤️ for seamless buyback
          </Text>
        </View>
      </ScrollView>

      <BottomNav currentScreen="Profile"  />
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
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 64,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  profileCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 64,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17,
  },
  profileEmail: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    marginTop: 2,
  },
  profilePhone: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginTop: 4,
  },
  statsWrapper: {
    paddingHorizontal: 24,
    marginTop: -32,
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statItemBordered: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#F3F4F6',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D8A4F',
  },
  statLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  menuWrapper: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    textAlign: 'left',
    fontWeight: '500',
    color: '#1F2937',
    fontSize: 15,
  },
  logoutWrapper: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#FEF2F2',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  logoutText: {
    fontWeight: '600',
    color: '#DC2626',
    fontSize: 15,
  },
  versionWrapper: {
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  versionSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
});