import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Alert } from "react-native";
import axios, { AxiosError } from "axios";

type SIProps = {
    server: string;
};

export default function SignInForm({ server }: SIProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        if (!email || !password) {
            alert("Please fill out all fields")
            return;
        }

        // check if password is suitable
        // check if email already in use

        try {
            const response = await axios.post(server, {
                email: email,
                password: password
            });

            alert(response.data.session_id)
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