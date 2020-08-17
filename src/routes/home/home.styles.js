import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = {
    mapContent: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: -1,
    },
    footerContent: {
        zIndex: 3
    },
    spinner: {
        marginBottom: 50,
        width: 300,
        height: 300,
        opacity: .8
    }

};

export default styles;