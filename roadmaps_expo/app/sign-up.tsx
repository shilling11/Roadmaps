import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { Link } from "expo-router";

import SignUpForm from "@/components/SignUp";

export default function SignUp() {
    const SERVER = "http://localhost:5000/sign-up";

    return (
        <View>
            <SignUpForm server={SERVER} />
            <Link href='/sign-in'>Already have an account? Sign in</Link>
        </View>
    );
}