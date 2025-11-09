import React from "react";
import { StyleSheet, Dimensions } from "react-native";

import NavBar from "./components/navBar";
import MusicBar from "@/components/musicBar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeDrawer from "./components/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusBar from "@/components/base/statusBar";
import HorizontalSafeAreaView from "@/components/base/horizontalSafeAreaView.tsx";
import globalStyle from "@/constants/globalStyle";
import Theme from "@/core/theme";
import HomeBody from "./components/homeBody";
import HomeBodyHorizontal from "./components/homeBodyHorizontal";
import useOrientation from "@/hooks/useOrientation";
import { useAppConfig } from "@/core/appConfig";

function Home() {
    const orientation = useOrientation();

    return (
        <SafeAreaView edges={["top", "bottom"]} style={styles.appWrapper}>
            <HomeStatusBar />
            <HorizontalSafeAreaView style={globalStyle.flex1}>
                <>
                    <NavBar />
                    {orientation === "vertical" ? (
                        <HomeBody />
                    ) : (
                        <HomeBodyHorizontal />
                    )}
                </>
            </HorizontalSafeAreaView>
            <MusicBar />
        </SafeAreaView>
    );
}

function HomeStatusBar() {
    const theme = Theme.useTheme();

    return (
        <StatusBar
            backgroundColor="transparent"
            barStyle={theme.dark ? undefined : "dark-content"}
        />
    );
}

// function Body() {
//     const orientation = useOrientation();
//     return (
//         <ScrollView
//             style={[
//                 styles.appWrapper,
//                 orientation === 'horizontal' ? styles.flexRow : null,
//             ]}>
//             <Operations orientation={orientation} />
//         </ScrollView>
//     );
// }

const LeftDrawer = createDrawerNavigator();
export default function App() {
    // 读取用户配置：是否全屏侧滑、最小触发距离
    const drawerFullScreenSwipe = useAppConfig("basic.drawerFullScreenSwipe");
    const drawerSwipeMinDistance = useAppConfig("basic.drawerSwipeMinDistance");

    const isFullScreenSwipe = drawerFullScreenSwipe ?? true;
    const edgeWidth = isFullScreenSwipe ? Dimensions.get("window").width : 25;
    const minDistance = drawerSwipeMinDistance ?? 100;

    return (
        <LeftDrawer.Navigator
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: "80%",
                },
                // 允许从屏幕任意位置右滑打开侧边栏
                swipeEnabled: true,
                swipeEdgeWidth: edgeWidth,
                // 最小滑动距离（可在设置中配置）
                swipeMinDistance: minDistance,
            }}
            initialRouteName="HOME-MAIN"
            drawerContent={props => <HomeDrawer {...props} />}>
            <LeftDrawer.Screen name="HOME-MAIN" component={Home} />
        </LeftDrawer.Navigator>
    );
}

const styles = StyleSheet.create({
    appWrapper: {
        flexDirection: "column",
        flex: 1,
    },
    flexRow: {
        flexDirection: "row",
    },
});
