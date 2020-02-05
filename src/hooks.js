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
