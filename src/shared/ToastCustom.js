import { ToastAndroid } from "react-native";

export const showToastShort = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

export const showToastWithGravity = (message) => {
  ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.TOP);
};

export const showToastWithGravityAndOffset = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};
