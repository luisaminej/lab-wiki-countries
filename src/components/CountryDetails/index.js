import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
    useParams,
    Link
} from 'react-router-dom'

export default function CountryDetails(props) {

    const [dataCountry, setDataCountry] = useState({
        capital: '',
        area: '',
        borders: [],
    });

    const [dataBorders, setDataBorders] = useState([])

    const { alpha3Code } = useParams()

    useEffect(() => {

        const getCountries = async (code) => {

            const res = await axios.get(`https://restcountries.eu/rest/v2/alpha/${code}?fields=name;capital;area;borders;`)


            const dataBorders = []
            for (let i = 0; i < res.data.borders.length; i++) {
                let codes = res.data.borders[i]
                const borderName = await axios.get(`https://restcountries.eu/rest/v2/alpha/${codes}?fields=name;`)

                dataBorders.push({
                    code: codes,
                    name: borderName.data.name,

                });
            }



            setDataCountry(res.data)
            setDataBorders(dataBorders)
        }

        getCountries(alpha3Code)

    }, [alpha3Code])



    return (
        <div>
            <h3>{dataCountry.name}</h3>
            <hr />
            <div className="row">
                <div className="col-4">Capital: </div>
                <div className="col-8">{dataCountry.capital}</div>
            </div>
            <hr />
            <div className="row">
                <div className="col-4">Area</div>
                <div className="col-8">{dataCountry.area} km <sup>2</sup>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-4">Borders</div>
                <div className="col-8">
                    <ul>
                        {
                            dataBorders.map((borderCountry, i) => {
                                return (
                                    <li key={i}>
                                        <Link to={`/${borderCountry.code}`}>{borderCountry.name}</Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>



    )
}
