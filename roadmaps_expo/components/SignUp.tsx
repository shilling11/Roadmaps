import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Alert } from "react-native";
import axios, { AxiosError } from "axios";

type SUProps = {
    server: string;
};

export default function SignUpForm({ server }: SUProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSignUp = async () => {
        if (password !== password2) {
            alert("Passwords do not match, please try again")
            return;
        }
        
        if (!email || !password || !password2) {
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
            <TextInput placeholder="re-enter password" value={password2} onChangeText={setPassword2} secureTextEntry/>
            <Button title="Sign Up" onPress={handleSignUp}/>
        </View>
    )
}