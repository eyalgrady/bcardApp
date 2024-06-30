import React from 'react';
import { useNavigate } from 'react-router-dom';

const SearchResult = ({result}) => {
    const navigate = useNavigate();

    return (
    <div className='search-result' onClick={(e)=>
        navigate(`/cards/${result._id}`)
    }> {result.title} </div>
    )
}

export default SearchResult;