import { useContext, useState } from "react";
import { View, TextInput, StyleSheet, Button, Alert } from "react-native";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import { useSession } from "./SessionAuth";

type SIProps = {
    server: string;
};

export default function SignInForm({ server }: SIProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { session, setSession } = useSession();

    const handleSignIn = async () => {
        if (!email || !password) {
            alert("Please fill out all fields")
            return;
        }

        try {
            const response = await axios.post(server, {
                email: email,
                password: password
            });

            await setSession(response.data.session_id);
            router.replace('/');
        }
        catch (error) {
            error instanceof AxiosError ? alert(`Error: ${error.response?.data.message}`) : alert(`Error: ${error}`);
        }

        return;
    };

    return (
        <View>
            <TextInput placeholder="email" value={email} onChangeText={setEmail}/>
            <TextInput placeholder="password" value ={password} onChangeText={setPassword} secureTextEntry/>
            <Button title="Sign In" onPress={handleSignIn}/>
        </View>
    )
}