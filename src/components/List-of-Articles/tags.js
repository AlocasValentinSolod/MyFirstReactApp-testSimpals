import React, {Fragment} from 'react';


class Tags extends React.Component{

    render(){

        return (
            <Fragment>
                <button style={{margin: 5}} className="btn btn-xs btn-default">{this.props.data}</button>
            </Fragment>
        );
    }
}

export default Tags;