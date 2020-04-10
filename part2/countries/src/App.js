import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import Filter from './components/Filter'

const App = () => {
  const [countryList, setCountryList] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const onSearchCountry = (event) => {
    setCountryFilter(event.target.value)
  }

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountryList(response.data)
    })
  }, [])

  return (
    <div>
      <Filter onChange={onSearchCountry} />
      <CountryList countries={countryList} countryFilter={countryFilter} />
    </div>
  )
}

export default App
