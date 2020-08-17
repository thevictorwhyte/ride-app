import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const styles = {
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    spinner: {
        width: 300,
        height: 300,
        opacity: .8
    }

};

export default styles;