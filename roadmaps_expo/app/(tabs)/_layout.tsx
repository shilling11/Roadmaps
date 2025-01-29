import { Tabs, Redirect } from "expo-router"
import { useSession } from "@/components/SessionAuth"

export default function TabLayout() {
    const { session } = useSession();

    if (!session) {
        return (<Redirect href='/sign-in'/>);
    }

    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: "Home" }}/>
            <Tabs.Screen name="about" options={{ title: "About" }}/>
        </Tabs>
    )
}