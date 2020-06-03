import React, { Component } from 'react'
import { Text, ScrollView, View } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { Loading } from './LoadingComponent'

const mapStateToProps = state => ({
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders
})

function RenderItems(props) {
    const item = props.item
    if (props.isLoading) {
        return(
            <Loading />
        )
    }
    else if (props.errMess) {
        return(
            <View>
                <Text>{props.errMess}</Text>
            </View>
        )
    }
    else
        if (item != null) {
            return(
                <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{uri: baseUrl + item.image}}
                imageProps={{style: {width: null, height: 150}}} >
                    <Text style={{margin: 10}}>
                        {item.description}
                    </Text>
                </Card>
            )
        }
        else 
            return(<View></View>)
}

class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    }


    render() {
        return(
            <ScrollView>
                <RenderItems item={this.props.dishes.dishes.filter((dish) => dish.featured )[0]} 
                errMess={this.props.dishes.errMess}
                isLoading={this.props.dishes.isLoading} />
                <RenderItems item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                errMess={this.props.promotions.errMess}
                isLoading={this.props.promotions.isLoading} />
                <RenderItems item={this.props.leaders.leaders.filter((leader) => leader.featured )[0]}
                errMess={this.props.leaders.errMess}
                isLoading={this.props.leaders.isLoading} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Home)