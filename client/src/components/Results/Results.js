import React from "react";
import Moment from "react-moment";

const Results = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <div className="panel panel-default">
            <div className="panel-heading">
              <h1>Results</h1>
            </div>
            <div className="panel-body">
              {props.results.slice(0, 5).map((results, i) => (
                <div className="article-wrapper" key={i}>
                  <div
                    className="panel panel-default"
                    style={{ marginBottom: "5px" }}
                  >
                    <div className="panel-body">
                      <button
                        className="btn btn-md btn-primary pull-right change-saved"
                        data-id=""
                        onClick={() => props.saveArticle(i)}
                      >
                        Save Article
                      </button>

                      <h4>{results.headline.main}</h4>

                      <p>
                        <a href={results.web_url} target="_blank">
                          Read Article
                        </a>
                      </p>

                      <p>
                        Publish Date:{" "}
                        <Moment format="MMMM Do, YYYY, h:mma">
                          {results.pub_date}
                        </Moment>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
