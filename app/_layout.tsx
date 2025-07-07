import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import './globals.css';

export default function RootLayout() {
  
  return(
  <>
    <StatusBar hidden={true}/>

    <Stack>
      
      <Stack.Screen
        name="Screens"
        options={{headerShown:false}}
        />
      <Stack.Screen
        name="Movies/[id]"
        options={{headerShown:false}}
        />
        
    </Stack>
  </>
  )
}
