import React, { Fragment } from 'react';

class Add extends React.Component{

    titleRef = React.createRef();
    bodyRef = React.createRef();
    tagsRef = React.createRef();

    state = {
      isTitleValid: false,
      isTextareaValid: false,
      isTagsValid: false,
      touched: {
        title: false,
        body: false,
        tags: false,
      }
    };


    handleBlur = (field) => () => {
      this.setState({
        touched: { ...this.state.touched, [field]: true },
      });
    };

    validateTitle = () => {
        if(this.titleRef.value.value.length > 0 && this.titleRef.value.value.length <= 30) {
            this.setState({
              isTitleValid: true,
            });
        } else {
          this.setState({
            isTitleValid: false,
          });
        }
    };

    validateTextArea = () => {
      if(this.bodyRef.value.value.length > 15 && this.bodyRef.value.value.length <= 500) {
        this.setState({
          isTextareaValid: true,
        });
      } else {
        this.setState({
          isTextareaValid: false,
        });
      }
    };

    validateTags = () => {
      if(!this.tagsRef.value.value.match(/(\w+\s)/i) && this.tagsRef.value.value.length !== 0) {
        this.setState({
          isTagsValid: true,
        });
      } else {
        this.setState({
          isTagsValid: false,
        });
      }
    };


    createArticle = (e) => {
        e.preventDefault();

        const newArticle = {
            id:Date.now(),
            title: this.titleRef.value.value,
            body: this.bodyRef.value.value,
            tags: this.tagsRef.value.value.split(", "),
        };
        this.props.createArticle(newArticle);
        this.areaForm.reset();
        this.setState({
            isTitleValid: false,
            isTextareaValid: false,
            isTagsValid: false,
            touched: {
                title: false,
                body: false,
                tags: false,
            }
        });

    };

    render(){
        const isDisabled = this.state.isTitleValid && this.state.isTextareaValid && this.state.isTagsValid;
        return (
            <Fragment>
                <form className='Add-article form-group col-sm-12' ref={(event) => { this.areaForm = event; }}>
                    <div className="form-group">
                        <input onChange={this.validateTitle} onBlur={this.handleBlur('title')} className="form-control"
                               name="title" ref ={this.titleRef } type = "text"
                               placeholder='Заголовок'/>
                        {
                          this.state.touched.title && !this.state.isTitleValid &&
                            <span style={{ color: 'crimson' }}>Заголовок должен быть Дленее 0 символов и не больше 15</span>
                        }
                    </div>
                    <div className="form-group">
                        <textarea onChange={this.validateTextArea} onBlur={this.handleBlur('body')} className={"form-control"}
                                   name="body" ref ={this.bodyRef}
                                   placeholder='Твои мысли'
                                   rows="4"/>
                        {
                          this.state.touched.body && !this.state.isTextareaValid &&
                          <span style={{ color: 'crimson' }}>Описание должен быть Дленее 15 символов и не больше 500</span>
                        }
                    </div>
                    <div className="form-group">
                        <input onChange={this.validateTags} onBlur={this.handleBlur('tags')} className="form-control"
                                name="tags" ref ={this.tagsRef }
                                type = "text"
                                placeholder='Тэги, И еще тэг, Ну может еще 1'/>
                        {
                          this.state.touched.tags && !this.state.isTagsValid &&
                          <span style={{ color: 'crimson' }}>Тэги не должны иметь пробелов, Пишите тэги через запятую пробел ('тэг, еще тэг')</span>
                        }
                    </div>
                    <button className={"btn btn-primary"}
                            disabled={!isDisabled}
                            onClick={this.createArticle}>Добавить</button>
                </form>
            </Fragment>
        );
    }
}

export default Add;


