import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [country, setCountry] = useState(null);
  const [status, setStatus] = useState(false);
  const [greeting, setGreeting] = useState('Hello');
  const [nativeLang, setNativeLan] = useState('en');
 


  useEffect(() => {
    getIPAddress()
    getSupportedAllLang()
  }, [])

  useEffect(() => {
    if(status){
      translateText()
    }
  }, [nativeLang])


  const getIPAddress = () => {
    axios.get('https://ipapi.co/json/')
      .then((response) => {
        let result = response?.data;
        console.log(result)
        setCountry(result.country_name)
        setNativeLan(result?.languages.split(',')[1])
        setStatus(true);

      })
      .catch((error) => {
        console.log(error);
      });


  };

  const getSupportedAllLang=()=>{
    axios.get(`https://libretranslate.de/languages`)
    .then((response) => {
        console.log('getSupportedAllLang',response.data)
    })
  }
  const translateText = () => {
     let data = {
         q : greeting,
         source: 'en',
         target: nativeLang
     }
     axios.post(`https://libretranslate.de/translate`, data)
     .then((response) => {
         console.log(response.data.translatedText)
         setGreeting(response.data.translatedText)
     })
     .catch((err)=>{
       console.log('err',err)
       alert(err)
     })
 }


  return (
    <div className="App">
      {status ?
        <div>
          <h3> {greeting} </h3>
          {country && <p>Country: {country}</p>}
          {nativeLang && <p>NativeLan : {nativeLang}</p>}
        </div>
        :
        <h4>Locating....... </h4>
      }

    </div>
  );
}

export default App;