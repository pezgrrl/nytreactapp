import React, { Component } from "react";
import API from "../../utils/API";
import Results from "../Results";
import Saved from "../Saved";
//import Modal from "react-bootstrap-modal";

const Modal = require('react-bootstrap').Modal;

class Search extends Component {
  state = {
    results: [],
    topic: "",
    startyear: "",
    endyear: "",
    articles: [],
    open: false,
    comment: "",
    commentArticleId: "",
    commentArticleTitle: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  openModal = (commentArticleId, commentArticleTitle) =>
    this.setState({
      open: true,
      comment: "",
      commentArticleId: commentArticleId,
      commentArticleTitle: commentArticleTitle
    });

  closeModal = () =>
    this.setState({
      open: false,
      comment: ""
    });

  saveComment = () => {
    if (this.state.comment) {
      API.saveComment({
        id: this.state.commentArticleId,
        body: this.state.comment
      })
        .then(
          this.setState({
            open: false,
            comment: ""
          })
        )
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  loadArticles = () => {
    API.getArticles()
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.log(err));
  };

  saveArticle = targetIndex => {
    if (
      this.state.results[targetIndex].headline.main &&
      this.state.results[targetIndex].pub_date &&
      this.state.results[targetIndex].web_url
    ) {
      API.saveArticle({
        title: this.state.results[targetIndex].headline.main,
        date: this.state.results[targetIndex].pub_date,
        url: this.state.results[targetIndex].web_url
      })
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  deleteComment = id => {
    API.deleteComment(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.apiArticles(this.state.topic, this.state.startyear, this.state.endyear)
      .then(res => {
        this.setState({ results: res, topic: "", startyear: "", endyear: "" });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Modal
          show={this.state.open}
          onHide={this.closeModal}
          aria-labelledby="ModalHeader"
        >
          <Modal.Header closeButton>
            <Modal.Title id="ModalHeader">
              {this.state.commentArticleTitle}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              value={this.state.comment}
              onChange={this.handleInputChange}
              name="comment"
              placeholder="Enter new note"
              className="form-control"
              id="comment"
            />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Dismiss className="btn btn-default">Cancel</Modal.Dismiss>
            <button className="btn btn-primary" onClick={this.saveComment}>
              Save
            </button>
          </Modal.Footer>
        </Modal>

        <div className="container">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h1>Search</h1>
                </div>
                <div className="panel-body">
                  <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                      <label htmlFor="topic">Topic:</label>
                      <br />
                      <input
                        value={this.state.topic}
                        onChange={this.handleInputChange}
                        name="topic"
                        placeholder="Enter Search Topic"
                        className="form-control"
                        id="topic"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="startyear">Start Year:</label>
                      <br />
                      <input
                        value={this.state.startyear}
                        onChange={this.handleInputChange}
                        name="startyear"
                        placeholder="YYYY"
                        className="form-control"
                        id="startyear"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="endyear">End Year:</label>
                      <br />
                      <input
                        value={this.state.endyear}
                        onChange={this.handleInputChange}
                        name="endyear"
                        placeholder="YYYY"
                        className="form-control"
                        id="endyear"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-default btn-primary"
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.results.length > 0 && (
          <Results
            results={this.state.results}
            saveArticle={this.saveArticle}
          />
        )}

        {this.state.articles.length > 0 && (
          <Saved
            saved={this.state.articles}
            openModal={this.openModal}
            deleteArticle={this.deleteArticle}
            deleteComment={this.deleteComment}
          />
        )}
      </div>
    );
  }
}
export default Search;
