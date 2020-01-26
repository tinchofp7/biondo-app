import React from 'react';
import { Link } from 'react-router-dom';


const NotFound = () => {
    return (
        <div>
            <h3>Pagina no se encuentra 404</h3>
            <Link to={`${process.env.PUBLIC_URL}/`} >Go home</Link>
            {console.log('Pagina no se encuentra 404')}
        </div>
        )
}

export default NotFound;