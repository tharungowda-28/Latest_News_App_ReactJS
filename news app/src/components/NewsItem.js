import React, { Component } from 'react';

export class NewsItem extends Component {
    render() {
        let { title, description, newsUrl } = this.props;

        return (
            <div className="news-card my-3">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Read More</a>
                </div>
            </div>
        );
    }
}

export default NewsItem;
