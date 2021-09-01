import { NativeModules } from "react-native";

const { TapPay } = NativeModules;

if (TapPay) {
  TapPay.isLoadSuccess = true;
}

export default TapPay;
