import axios from "axios";

export default {
  apiArticles: function(topic, startYear, endYear) {
    let apikey = "ae734789234f4c9790c50485a5a8c017";
    let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apikey}&q=${topic}&begin_date=${startYear}0101&end_date=${endYear}1231&fl=web_url,headline,pub_date`;
    return axios.get(url).then(res => {
      return res.data.response.docs;
    });
  },

  getArticles: function() {
    return axios.get("/api/articles");
  },

  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },

  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },

  saveComment: function(commentData) {
    return axios.post("/api/articles/" + commentData.id, commentData);
  },

  deleteComment: function(id) {
    return axios.delete("/api/articles/comments/" + id);
  }
};
