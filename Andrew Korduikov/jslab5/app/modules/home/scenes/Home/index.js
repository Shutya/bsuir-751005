import React from 'react';
import { FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';

import NewsItem from "../../components/NewsItem"

import { actions as home } from "../../index"
const { getNewsHeadlines } = home;

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            refreshing: false,
            search: '',
        }
        this.articlesWithSearch = []
        this.initialNumOfArticles = 10
    }

    updateSearch = search => {
      this.setState({ search });
      this.updateArticlesIfSearched();
    }

    updateArticlesIfSearched() {
      const { articles } = this.props;
      const { search } = this.state;
      if (search == '') {
          for (i = 0; i < this.initialNumOfArticles; i++) {
            this.articlesWithSearch[i] = articles[i];
          }
      } else {
        this.articlesWithSearch = articles.filter( article => article.title.toLowerCase().includes(search.toLowerCase()) );
      }
     }

    componentDidMount() {
        this.getNewsHeadlines(false);
    }

    getNewsHeadlines = (refreshing = true) => {
        this.setState({ refreshing });
        this.props.getNewsHeadlines()
            .finally(() => this.setState({ refreshing: false }));
    }

    renderItem = ({ item, index }) => {
        return <NewsItem article={item} />
    }

    renderHeader = () => {    
        const { search } = this.state;
        return (      
          <SearchBar
            lightTheme        
            round    
            placeholder="Type Here..."
            onChangeText={this.updateSearch}
            value={search}
            autoCorrect={false}         
          />
        );  
      };

    handleEndReached = () => {
      if (this.initialNumOfArticles < 35) {
        this.initialNumOfArticles += 5
        this.updateArticlesIfSearched();
      }
    }

    render() {
        const { articles, isFetching, hasError, errorMsg } = this.props;
        if (isFetching) return <ActivityIndicator />
        else {
          this.updateArticlesIfSearched();
            return (
                <FlatList
                    style={{backgroundColor:'#eaeaea'}}
                    contentContainerStyle={{ paddingVertical: 5, }}
                    ref='listRef'
                    data={this.articlesWithSearch}
                    extraData={this.state}
                    renderItem={this.renderItem}
                    initialNumToRender={this.initialNumOfArticles}
                    keyExtractor={(item, index) => index.toString() + "_home"}
                    ListHeaderComponent={this.renderHeader}
                    onEndReached={this.handleEndReached} 
                    onEndReachedThreshold={0.2}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.getNewsHeadlines}
                        />
                    } />
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isFetching: state.homeReducer.isFetching,
        hasError: state.homeReducer.hasError,
        errorMsg: state.homeReducer.errorMsg,
        articles: state.homeReducer.articles
    }
}

export default connect(mapStateToProps, { getNewsHeadlines })(Home);