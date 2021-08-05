import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import axios from 'axios';
import {
  Route,
  Switch
} from 'react-router-dom';

function App() {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    const getCountries = async () => {
      const res = await axios.get('https://restcountries.eu/rest/v2/all?fields=name;alpha3Code;')

      console.log(res)
      setCountries(res.data)


    }

    getCountries()
  }, [])

  return (

    <>
      <Navbar />

     

       
                <CountriesList countries={countries} />

                <Switch>
                  
                    Country details
                    <Route
                      exact
                      path="/:alpha3Code"
                      component={CountryDetails}
                    />
                  
                </Switch>



           
    </>
  );
}

export default App;
