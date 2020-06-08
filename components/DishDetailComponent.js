import React, { Component, createRef } from 'react'
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native'
import { Card, Icon, Rating, Input } from 'react-native-elements'
import { baseUrl } from '../shared/baseUrl'
import { connect } from 'react-redux'
import { postFavorite, postComment } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable'

const mapStateToProps = state => ({
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
})

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {

    const dish = props.dish;

    handleViewRef = ref => this.view = ref

    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if (dx < -200)
            return true
        else
            return false
    }

    const recognizeleftDrag = ({moveX, moveY, dx, dy}) => {
        if (dx > 200)
            return true
        else
            return false
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
            .then(endState => console.log(endState.finished? 'finished' : 'cancelled'))
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert('Add to Favorites?', 
                'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: () => props.favorite ? console.log('Already Favorite') : props.onPress()
                    }
                ],
                {cancelable: true})
            else if (recognizeleftDrag(gestureState))
                props.toggleModal()
            return true
        }
    })

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        })
    }
    
    if (dish != null) {
        return(
            <Animatable.View animation='fadeInDown' duration={2000} delay={1000} 
            ref={this.handleViewRef}
            {...panResponder.panHandlers} >
                <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}
                imageProps={{ style: {width: null, height: 150} }}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={styles.row} >
                        <Icon style={styles.icons, {flex: 1}} raised reverse name={ props.favorite ? 'heart' : 'heart-o'} 
                            type='font-awesome' 
                            color='#f50' 
                            onPress={() => props.favorite ? console.log('Already Favorite') : props.onPress()} />
                        <Icon style={styles.icons, {flex: 1}} raised reverse name={'pencil'} 
                            type='font-awesome' 
                            color='#512DA8' 
                            onPress={() => props.toggleModal()} />
                        <Icon style={styles.icons, {flex: 1}} raised reverse name={'share'} 
                            type='font-awesome' 
                            color='#51D2A8'
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} />
                        
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return(<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments
    const renderCommentItem = ({item, index}) => {
        return(
            <View key={index} style={{margin: 10, flex: 1}}>
                <Text imageSize={12} style={{fontSize: 14}}>{item.comment}</Text>
                <Rating style={{flex: 1, alignItems: 'flex-start'}} imageSize={20} readonly startingValue={item.rating} />
                <Text style={{fontSize: 12}}>{'--' + item.author + ', ' + item.date}</Text>
                {/* + (new Intl.DateTimeFormat('en-US', {year: "numeric", month: "long", day: "2-digit"}).format(item.date)) */}
            </View>
        )
    }

    return(
        <Animatable.View animation='fadeInUp' duration={2000} delay={1000} >
            <Card title="Comments">
                <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()} />
            </Card>
        </Animatable.View>
    )
}

class Dishdetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            author: "",
            comment: "",
            rating: 0,
            showModal: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    handleSubmit(dishId) {
        this.toggleModal()
        console.log(dishId, this.state.rating, this.state.author, this.state.comment)
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '')
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    toggleModal={() => this.toggleModal()} />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}
                 />
                 <Modal animationType={'slide'}
                transparent={false}
                visible={this.state.showModal}
                onDismiss={() => this.toggleModal()}
                onRequestClose={() => this.toggleModal()} >
                    <View style={styles.modal}>
                        <Rating showRating fractions={0} startingValue={0} onFinishRating={(val) => this.setState({rating: val})} />
                        <Input placeholder=' Autor' name='author' onChangeText={(val) => this.setState({author: val})}
                        leftIcon={
                            <Icon
                                name='user'
                                type='font-awesome'
                                size={24}
                                color='black'
                            />
                            }
                        />
                        <Input placeholder=' Comment' onChangeText={(val) => this.setState({comment: val})}
                        leftIcon={
                            <Icon
                                name='comment'
                                type='font-awesome'
                                size={24}
                                color='black'
                            />
                            }
                        />
                        <View style={styles.row, {margin: 10}}>
                            <Button onPress={() => this.handleSubmit(dishId)}  color='#512DA8' title='Submit' />
                        </View>
                        <View style={styles.row, {margin: 10}}>
                            <Button onPress={() => this.toggleModal()} color='grey' title='Close' />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    row: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    icons: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail)