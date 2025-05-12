import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries')
        const data = await response.json()
        setCountries(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
}, [])

const handle = (e)=>{
  let searchVaule = e.currentTarget.value
  setSearchTerm(searchVaule);
  setFilteredCountries([]);
  let store = [];
  if(searchVaule){
    countries.filter(x=>{
      if(x.common.toLowerCase().includes(searchVaule.toLowerCase())){
        store.push(x);
      }
    })
    setFilteredCountries(store);
  }else {
    store = [];
    setFilteredCountries([]);
  }
}
  return(
    <div className="country search">
      <input type="text" value={searchTerm} placeholder='Search for Countries' onChange={handle} style={{width:"80vw", height:30, fontWeight:600, cursor:'pointer'}} />
       <hr />
      <br />
      <div className="country-list">
          <Card countries={searchTerm.length!=0 ? filteredCountries : countries }/>
       </div>
    
    </div>
  )
}

function Card( {countries, }) {

  return(<div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '20px'}}>  
    {countries.map((c)=>{
      return(<div className="countryCard" key={c.common} style={{border: '2px solid black', width:'150px', height: '130px', display:'flex', flexDirection:"column", justifyContent:"space-around", alignItems:"center"}}>
        <img src={c.png} alt={c.common} style={{width:"70px", height:70}}/>
        <h2>{c.common}</h2>
        </div>)
    })}
    </div>
  )

}
export default App
