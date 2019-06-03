import React from 'react';
import {WebView, ActivityIndicator} from 'react-native';

export default class Article extends React.Component {
    render() {
        let { url } = this.props.article;

        return (
            <WebView
                source={{uri: url}}
                style={{flex: 1}}
                renderLoading={this.renderLoading}
            />
        );
    }

    renderLoading() {
        return (
            <ActivityIndicator
                style={{
                    borderWidth:1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}/>
        );
    }
}