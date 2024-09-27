import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import TabBarIcon from './TabBarIcon';
import { useEffect, useState } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import Shape from './Shape';

const { width, height } = Dimensions.get('window');

export default function CustomTabBar({ state, descriptors, navigation }) {
    const translateX = useSharedValue(0);
    const [dimentions, setDimentions] = useState({ width: 200, height: 100 });

    const buttonWidth = dimentions.width / state.routes.length;

    const onTabBarLayout = (e) => {
        console.log(e.nativeEvent);
        setDimentions({
            width: e.nativeEvent.layout.width,
            height: e.nativeEvent.layout.height,
        });
    };

    useEffect(() => {
        translateX.value = withTiming(buttonWidth * state.index, {
            duration: 500,
        });
    }, [state.index]);

    const rShape = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }, { scale: 1.3 }],
        };
    });

    return (
        <View style={styles.tabBarContainer} onLayout={onTabBarLayout}>
            <Animated.View style={[styles.shape, rShape]}>
                <Shape width={buttonWidth} height={100} />
            </Animated.View>

            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarIcon
                        key={label}
                        onPress={onPress}
                        isFocused={isFocused}
                        label={label}
                        options={options}
                    />
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: 'row',
        height: 60,
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: '#232323',

        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: width,
        bottom: 250,
        paddingVertical: 15,
        shadowColor: 'black',
        shadowOffset: { height: 10, width: 0 },
        shadowOpacity: 0.5,
        elevation: 15,
    },
    shape: {
        position: 'absolute',
        bottom: 11,
        left: -5,
        transform: [{ scale: 2 }],
    },
});
