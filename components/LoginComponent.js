import React, { Component } from 'react'
import { View, StyleSheet, Text, ScrollView, Image} from 'react-native'
import { Icon, Input, CheckBox, Button} from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { baseUrl } from '../shared/baseUrl'

class LoginTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
        .then((userdata) => {
            if (userinfo) {
                let userinfo = JSON.parse(userdata)
                this.setState({username: userinfo.username, password: userinfo.password, remember: true})
            }
        })
        .catch((err) => console.log('Cannot find user info' + err))
    }

    static navigationOption = {
        title: 'Login',
        tabBarIcon: ({tintColor}) => (
            <Icon name='sign-in' type='font-awesome' size={24}
            iconStyle={{color: tintColor}} />
        )
    }

    handleLogin() {
        console.log(JSON.stringify(this.state))
        if (this.state.remember) {
            SecureStore.setItemAsync('userdata',
            JSON.stringify({username: this.state.username, password: this.state.password}))
            .catch((err) => console.log('Could not save user info', err))
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch((err) => console.log('Could not delete user info', err))
        }
    }

    render() {
        return(
            <View style={styles.container} >
                <Input placeholder='Username'
                    leftIcon={{type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(username) => this.setState({username: username})}
                    value={this.state.username}
                    containerStyle={styles.formInput} />
                <Input placeholder='Password'
                    leftIcon={{type: 'font-awesome', name: 'key'}}
                    onChangeText={(password) => this.setState({password: password})}
                    value={this.state.password}
                    containerStyle={styles.formInput} />
                <CheckBox title='Remember Me'
                center
                checked={this.state.remember}
                onPress={() => this.setState({remember: !this.state.remember})}
                containerStyle={styles.formCheckbox}
                />
            <View style={styles.formButton} >
            <Button onPress={() => this.handleLogin()}
                        title='Login'
                        icon={<Icon name='sign-in' size={24} type='font-awesome' color='white' />}
                        buttonStyle={{backgroundColor: '#512DA8'}} />
            </View>
            <View style={styles.formButton} >
            <Button onPress={() => this.props.navigation.navigate('Register')}
                        title='Register'
                        clear
                        icon={<Icon name='user-plus' size={24} type='font-awesome' color='blue' />}
                        titleStyle={{color: 'blue'}} />
            </View>
            </View>
        )
    }
}

class RegisterTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA)
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            })
            if (!capturedImage.cancelled) {
                this.processImage(capturedImage.uri)
            }
        }
    }

    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (cameraRollPermission.status === 'granted'){
            let capturedImage = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3]
              })
              if (!capturedImage.cancelled) {
                this.processImage(capturedImage.uri)
              }
        }
      }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                {resize: {width: 400}}
            ],
            {format: 'png'}
        )
        this.setState({imageUrl: processedImage.uri})
    }

    handleRegister() {
        console.log(JSON.stringify(this.state))
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo',
            JSON.stringify({username: this.state.username, password: this.state.password}))
            .catch((err) => console.log('Could not save user info', err))
            }
        }

    static navigationOption = {
        title: 'Register',
        tabBarIcon: ({tintColor}) => (
            <Icon name='user-plus' type='font-awesome' size={24}
            iconStyle={{color: tintColor}} />
        )
    }

    render() {
        return(
            <ScrollView>
                <View style={styles.container} >
                    <View style={styles.imageContainer}>
                        <Image source={{uri: this.state.imageUrl}}
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image} />
                        <View style={{margin: 20}}>
                            <Button title='Camera'
                                onPress={this.getImageFromCamera} />
                        </View>
                        <View style={{margin: 20}}>
                            <Button title='Gallery'
                                onPress={this.getImageFromGallery} />
                        </View>
                    </View>
                    <Input placeholder='Username'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(username) => this.setState({username: username})}
                        value={this.state.username}
                        containerStyle={styles.formInput} />
                    <Input placeholder='First Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(firstname) => this.setState({firstname: firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput} />
                    <Input placeholder='Last Name'
                        leftIcon={{type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(lastname) => this.setState({lastname: lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput} />
                    <Input placeholder='Email'
                        leftIcon={{type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={(email) => this.setState({email: email})}
                        value={this.state.email}
                        containerStyle={styles.formInput} />
                    <Input placeholder='Password'
                        leftIcon={{type: 'font-awesome', name: 'key'}}
                        onChangeText={(password) => this.setState({password: password})}
                        value={this.state.password}
                        containerStyle={styles.formInput} />
                    <CheckBox title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                    <View style={styles.formButton, {backgroundColor: '512DA8'}} >
                        <Button onPress={() => this.handleRegister()}
                        title='Register'
                        icon={<Icon name='user-plus' size={24} type='font-awesome' color='white' />}
                        buttonStyle={{backgroundColor: '#512DA8'}} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({tintColor}) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Login') {
        iconName = `sign-in`
      } else if (routeName === 'Register') {
        iconName = `user-plus`;
      }

      // You can return any component that you like here!
      return <Icon name={iconName} type='font-awesome' size={24} color={tintColor} />;
    },
  }),
    tabBarOptions: {
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: 'white',
        inactiveTintColor: 'gray'
    }
})

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    image: {
        margin: 10,
        width: 80,
        height: 60
    },
    formInput: {
        margin: 5,
        width: '100%'
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
})

export default Login