import React from 'react'


import {
    Link
} from 'react-router-dom'

export default function CountriesList(props) {


    return (
        <>
           <div className="countries-list list-group" role="tablist"></div>
                {props.countries.map((country, i) => {
                    return (
                        <Link
                            to={`/${country.alpha3Code}`}
                            key={i}
                            style={{
                                display: "flex",
                            }}

                            >
                            {country.name}
                           
                        </Link>
                    )
                })}

            
        </>
    )
}
