import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { request, PERMISSIONS } from 'react-native-permissions';

interface HomeScreenProps {
    navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const cameraRef = useRef(null);
    const [isRecording, setIsRecording] = useState(false);

    const startRecording = async () => {
        if (cameraRef.current) {
            setIsRecording(true);
            const options = { quality: RNCamera.Constants.VideoQuality['720p'] };
            const { uri, codec = 'mp4' } = await cameraRef.current.recordAsync(options);
            console.log('Recording saved to:', uri);
            setIsRecording(false);
        }
    };

    return (
        <View style={styles.container}>
            <RNCamera
                ref={cameraRef}
                style={styles.camera}
                type={RNCamera.Constants.Type.back}
                captureAudio={true}
            />
            <TouchableOpacity onPress={startRecording} style={styles.captureButton}>
                <Text style={styles.captureButtonText}>
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
    },
    captureButton: {
        alignSelf: 'center',
        margin: 20,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    captureButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});


export default HomeScreen;


