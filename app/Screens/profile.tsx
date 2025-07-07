import { icons } from "@/constants/icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="bg-gray-950 flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text className="text-gray-500 text-base">Profile</Text>

        <TouchableOpacity
                className="absolute bottom-5 left-0 right-0 mx-5 bg-purple-400 rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                onPress={()=> router.push("/_sitemap")}
              >
                <Text className="text-white font-semibold text-base">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;