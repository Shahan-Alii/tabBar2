import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import CustomTabBar from '../components/CustomTabBar';
import Lottie from 'lottie-react-native';

function HomeScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Settings!</Text>
        </View>
    );
}

function ExploreScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Explore</Text>
        </View>
    );
}

function ProfileScreen() {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>Profile</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tab.Screen
                name="Home"
                options={{
                    tabBarIcon: ({ ref }) => (
                        <Lottie
                            ref={ref}
                            loop={false}
                            source={require('../assets/lottie/home.json')}
                            style={styles.icon}
                        />
                    ),
                }}
                component={HomeScreen}
            />
            <Tab.Screen
                name="Settings"
                options={{
                    tabBarIcon: ({ ref }) => (
                        <Lottie
                            ref={ref}
                            loop={false}
                            source={require('../assets/lottie/settings.json')}
                            style={styles.icon}
                        />
                    ),
                }}
                component={SettingsScreen}
            />
            <Tab.Screen
                name="Explore"
                options={{
                    tabBarIcon: ({ ref }) => (
                        <Lottie
                            ref={ref}
                            loop={false}
                            source={require('../assets/lottie/explore.json')}
                            style={styles.icon}
                        />
                    ),
                }}
                component={ExploreScreen}
            />
            <Tab.Screen
                name="Profile"
                options={{
                    tabBarIcon: ({ ref }) => (
                        <Lottie
                            ref={ref}
                            loop={false}
                            source={require('../assets/lottie/profile.json')}
                            style={styles.icon}
                        />
                    ),
                }}
                component={ProfileScreen}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    icon: {
        height: 30,
        width: 30,
    },
});
