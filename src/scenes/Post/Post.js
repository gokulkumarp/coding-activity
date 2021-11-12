import React, {useState, useEffect} from 'react';
import {nanoid} from 'nanoid';
import './Post.css';

const removeTags = (content) => {
  const regex = /(<([^>]+)>)/gi;
  return content.replace(regex, '');
}

const ErrorComponent = ({error})=>{
  return <h1>Error: {error}</h1>
}

const Post = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async ()=>{
    
    try {
     const response =await fetch(
       'https://content-eu-4.content-cms.com/api/859f2008-a40a-4b92-afd0-24bb44d10124/delivery/v1/content/db4930e9-7504-4d9d-ae6c-33facca754d1'
     );
         const data = await response.json();
         setIsLoaded(true);
         setItem(data.elements);
     } catch (error) {
         setIsLoaded(true);
         setError(error);
    } 
  }

  if (error) {
    return <ErrorComponent error={error.message}/>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        {item.heading ? (
          <div className="card">
            <img
              src={
                'https://content-us-1.content-cms.com/' +
                item?.mainImage.value.leadImage.url
              }
              className="img-container"
              alt={item?.mainImage.value.leadImageCaption.value}
            ></img>
            <div className="card-content">
              <h2>{item.heading.value}</h2>
              <div className="excerpt">
                {item.body.values.map((content) => (
                  <p key={nanoid()}>{removeTags(content)}</p>
                ))}
              </div>
              <p className="author">
                {item.author.value} |{' '}
                {new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                }).format(new Date(item.date.value))}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Post;
