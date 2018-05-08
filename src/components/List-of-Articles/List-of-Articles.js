import React, {Fragment} from 'react';
import Tags from './tags'
import Edit from '../Edit-Add/Edit'

class ListOfArticles extends React.Component{

    render(){
        const tagsArr = this.props.details.tags;
        return (
            <Fragment>
                <div className={'article border border-primary rounded'} style={{margin: 40, padding: 15}}>
                    <div className={'title'}>
                        <h3>{this.props.details.title}</h3>
                    </div>
                    <div className={'info'}>
                        <p>{this.props.details.body}</p>
                    </div>
                    <div className={'tags'}>
                        {tagsArr.map( key =>( <Tags key={key} data={key}  />))}
                    </div>
                    <div className='control' style={{marginBottom:20}}>
                        <button  className="btn btn-danger btn-mini"
                                 style={{margin:5}}
                                 onClick={() => this.props.removeArticle(this.props.index)} >Удалить</button>
                        <button  className="btn btn-danger btn-mini"
                                 style={{margin:5}}
                                 onClick={ ()=>{document.getElementById(this.props.index).style.display = 'inline';}}>Редак.</button>
                        <button className={'btn btn-danger btn-mini'}
                                style={{margin:5}}
                                onClick={ ()=>{document.getElementById(this.props.index).style.display = 'none';}}>Скрыть</button>
                    </div>
                    <div id={this.props.index} style={{display:'none'}}>
                        <Edit editArticle={this.props.editArticle} index={this.props.index} articleId={this.props.details.id} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ListOfArticles;
