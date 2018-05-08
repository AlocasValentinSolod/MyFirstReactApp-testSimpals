import React, {Fragment} from 'react';
import ListOfArticles from "./List-of-Articles/List-of-Articles";
import data from './Data/posts.json'
import Add from "./Edit-Add/Add";

class App extends React.Component {

    state = {
        articles: [],
    };


    componentWillMount() {
        localStorage.getItem('Articles') && this.setState({
            articles: JSON.parse(localStorage.getItem('Articles'))
        });
    };

    componentDidMount() {
        if(!this.state.articles.length) {
            this.setState({
                articles: data,
            });
        }
    };

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('Articles', JSON.stringify(nextState.articles));
    };

    createArticle = (newArticleData) => {
        let articles = [...this.state.articles];
        articles.push(newArticleData);
        this.setState({ articles });
    };

    editArticle = (editedArticle,articleId) => {
        let articles = [...this.state.articles];
        articles.map(key =>{
            if(key.id === articleId){
                key.title = editedArticle.title;
                key.body = editedArticle.body;
                key.tags = editedArticle.tags;
            }
        });
        this.setState({ articles });
    };


    removeArticle = (index) => {
        const articles = [...this.state.articles];
        articles.splice(index, 1);
        this.setState({ articles });
    };

    render() {
        return (
          <Fragment>
              <div className="container">
                  <div className="row">
                      <div className="col-sm-7" style={{marginTop: 50}}>
                          {Object.keys(this.state.articles).map(key => (
                              <ListOfArticles removeArticle = {this.removeArticle}
                                              editArticle={this.editArticle}
                                              key={key} index={key}
                                              details={this.state.articles[key]} editForm={this.state.editForm} />
                          ))}
                      </div>
                      <div className="col">
                          <div className="col-sm-12" style={{marginTop:90}}>
                            <Add createArticle={this.createArticle.bind(this)}/>
                          </div>
                      </div>
                  </div>
              </div>
          </Fragment>
        );
    }
}

export default App;


