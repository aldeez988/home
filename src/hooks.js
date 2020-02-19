import { useEffect, useState } from 'react';

export const useFetch = (url, initialValue) =>{
    const [result, setResult] = useState(initialValue);
    useEffect(() => {
        fetch(url)
        .then(response=>{
            return response.json()
        }).then(json=>{
            console.log('joke json', json);
           setResult(json);
        });
    }, []);
    return result;
};


export const useDynamicTransition = ({ increment, delay, length}) =>{
    const [index, setIndex] = useState(0);
    useEffect(()=>{
        const interval = setInterval(()=>{
             setIndex(storedIndex=>{
                 return (storedIndex+increment)%length
             })
         }, delay);
 
         return ()=>clearInterval(interval);
     }, [increment, delay]);

     return index;
 
  
};