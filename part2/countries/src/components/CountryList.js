import React from 'react'
import CountryData from './CountryData'

const CountryList = ({countries, countryFilter}) => {
  const filteredCountries = countries.filter(
    country => country.name.toLowerCase().includes(countryFilter.toLowerCase())
  )

  return (
    <>
      { filteredCountries.length > 10 &&
        <p>Too many matches, please specify another filter.</p>
      }
      { filteredCountries.length > 1 && filteredCountries.length <= 10 &&
        <table>
          <tbody>
            { filteredCountries.map(country =>
              <tr key={country.name}>
                <td>{country.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      }
      { filteredCountries.length === 1 &&
        <CountryData country={filteredCountries[0]} />
      }
      { filteredCountries < 1 &&
        <p>No matches, please specify another filter.</p>
      }
    </>
  )
}

export default CountryList