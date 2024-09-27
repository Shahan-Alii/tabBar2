import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Feather from '@expo/vector-icons/Feather';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Lottie from 'lottie-react-native';

const icons = {
    Home: (props) => <Feather name="home" size={24} {...props} />,
    Settings: (props) => <Feather name="settings" size={24} {...props} />,
    Explore: (props) => <Feather name="compass" size={24} {...props} />,
    Profile: (props) => <Feather name="user" size={24} {...props} />,
};

const bgColor = {
    Home: '#FF6B6B',
    Settings: '#4ECDC4',
    Explore: '#FFD93D',
    Profile: '#5C7AEA',
};

const CIRCLE_SIZE = 55;

const TabBarIcon = ({ onPress, isFocused, label, options }) => {
    const translateY = useSharedValue(0);
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);
    const circleScale = useSharedValue(0);

    const ref = useRef(null);

    useEffect(() => {
        opacity.value = withTiming(isFocused ? 1 : 0, { duration: 400 });
        translateY.value = withTiming(isFocused ? -12 : 0, { duration: 400 });
        scale.value = withTiming(isFocused ? 1.4 : 1.3, { duration: 400 });
        circleScale.value = withTiming(isFocused ? 1 : 0.3, { duration: 500 });
    }, [isFocused]);

    useEffect(() => {
        if (isFocused && ref?.current) {
            ref.current.play();
        }
    }, [isFocused]);

    const rCircle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,

            transform: [{ scale: circleScale.value }],
        };
    });

    const rImage = useAnimatedStyle(() => {
        return {
            transform: [
                { translateY: translateY.value },
                { scale: scale.value },
            ],
        };
    });

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Animated.View
                style={[
                    styles.circle,
                    rCircle,
                    { backgroundColor: bgColor[label] },
                ]}
            />

            <Animated.View style={rImage}>
                {options.tabBarIcon ? (
                    options.tabBarIcon({ ref })
                ) : (
                    <Text>?</Text>
                )}
            </Animated.View>
        </TouchableOpacity>
    );
};

export default TabBarIcon;

const styles = StyleSheet.create({
    circle: {
        position: 'absolute',
        height: CIRCLE_SIZE,
        width: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        bottom: -1,
    },
});
