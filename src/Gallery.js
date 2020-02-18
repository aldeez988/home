import React, {useState, useEffect} from 'react';
import PICTURES from './data/pictures';


function Gallery () {
    const [index, setIndex] = useState(0);
    console.log("index", index);

    useEffect(()=>{
        setInterval(()=>{
            setIndex(storedIndex=>{
             return (storedIndex + 1) % PICTURES.length;
            });
        }, 3000);
    }, []);

    return(
    <div className="Gallery">
        <img 
        src={PICTURES[index].image}
        alt="Gallery"
        />
    </div>);
}

export default Gallery; 
