import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
  const token = localStorage.getItem('x-auth-token');
  const [users, setUsers] = useState([]);
      
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(()=> {
    const fetchCards = async() => {
      setIsLoading(true);
      try {
        axios.defaults.headers.common['x-auth-token'] = token;
        const response = await axios.get('https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users');
        setUsers(response.data);
      } catch(error) {
        setError(error.message);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    } 
        fetchCards();
  }, [token])

  if (error) return <div>Error {error}</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!users) return <div>No users</div>;

  return (
        
        <div className='cards-container'>

            
            <div className='create-btn'>
              {token && (
                  <>
                  <Link to={'/create'}>CREATE</Link>
                  </>
                )}
            </div>

            <h1>Cards Page</h1>
            <h2>Here you can find business cards from all categories</h2>
            

            
            <div className='cards_list'>
                { users.map(user => (
                    <div
                    className='card'
                    key={user._id}>
                        <div className='card-description'>
                            <h3>{user.name.first}</h3>
                            <p>{user.name.middle}</p>
                            <p>{user.name.last}</p>
                            <div>
                                <p>
                                    <span>Phone:</span> {user.phone}<br/>
                                    <span>Email:</span> {user.email}<br/>
                                    <span>Address:</span> {user.address.street} {user.address.houseNumber}<br/>
                                    {user.address.city}, {user.address.country}<br/>
                                    <span>Card Number:</span> {user.bizNumber}
                                </p>
                            </div>
                        </div>

                        
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Users