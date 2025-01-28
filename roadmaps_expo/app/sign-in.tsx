import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { Link } from "expo-router";

import SignInForm from "@/components/SignIn";

export default function SignIn() {
    const SERVER = "http://localhost:5000/sign-in";

    return (
        <View>
            <SignInForm server={SERVER} />
            <Link href='/sign-up'>Haven't signed up? Register here</Link>
        </View>
    );
}