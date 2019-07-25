import React from 'react';

function Breadcrumb({title, bread}){
    return(
        <div className="breadcrumb">
            <h1><b>{title}</b></h1>
        </div>
    );
}

export default Breadcrumb;