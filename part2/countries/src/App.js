import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, handleFilterChange }) =>
  <>
    find countries <input value={filter} onChange={handleFilterChange} />
  </>

const Country = ({ country }) => {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }, [url])
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt="Flag"/>
      <h3>Weather in {country.capital}</h3>
      <p><b>temperature:</b> {weather.main?.temp -273.15} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather?.find(() => true).icon}@2x.png`} alt="Weather Icon"/>
      <p><b>wind:</b> {weather.wind?.speed} m/s</p>
    </div>
  )
}

const Countries = ({ countries, filter, setFilter }) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <Country country={filteredCountries[0]} />
      </div>
    )
  } else {
    return (
      <div>
        {
          filteredCountries.map(country =>
            <p key={country.name.common}>
              {country.name.common}
              <button onClick={() => setFilter(country.name.common)}>show</button>
            </p>
          )}
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const newFilterHandler = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={newFilterHandler} />
      <Countries countries={countries} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App
