import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        };
    }

    async componentDidMount() {
        this.fetchNews();
    }

    fetchNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=1735713cb01147be8abf8df8d449c34c&page=${this.state.page}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
    };

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 }, this.fetchNews);
    };

    handleNextClick = async () => {
        if (this.state.page + 1 <= Math.ceil(this.state.totalResults / 20)) {
            this.setState({ page: this.state.page + 1 }, this.fetchNews);
        }
    };

    render() {
        return (
            <div className="container my-3">
                <h1>News-Star Top Headlines</h1>
                {this.state.loading && <h2>Loading...</h2>}
                <div className="row">
                    {!this.state.loading &&
                        this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4 mt-2" key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        newsUrl={element.url}
                                    />
                                </div>
                            );
                        })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>
                        &larr; Previous
                    </button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
