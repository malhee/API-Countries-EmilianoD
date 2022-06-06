import React,{useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import { getCountries,filterCountriesByContinent, filtradoAlfabetic, filterActivities, filterByPoblation, getActivities} from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export default function Home (){
    const dispatch = useDispatch();                                   // ejecuto dispatch en una variable
    const {countries, activities} = useSelector((state)=> state)          // traigo el estado que quiero
    const [currentPage, setcurrentPage] = useState(1);                // se inicia en la primera pagina
    const [countriesPerPage] = useState(10);                         //cantidad de cards que se van a mostrar por pagina
    const [,setOrder] = useState("")
    const lastCountry = currentPage * countriesPerPage;
    const firstCountry = lastCountry - countriesPerPage;
    const currentCountriesPage = countries.slice(firstCountry, lastCountry);
    const pagination = (pageNumber)=>{setcurrentPage(pageNumber)}

 
    
    useEffect(() =>{
        setcurrentPage(1)
        dispatch(getCountries());
        dispatch(getActivities())
    },[dispatch])

    console.log(countries)
    console.log(currentCountriesPage)
    
    function handleClick(e){
    e.preventDefault();
    dispatch(getCountries())
    }

    function handleAlfa(e){
        e.preventDefault();
        dispatch(filtradoAlfabetic(e.target.value))
        setcurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleFiltradoPoblacion(ev){
        ev.preventDefault();
        dispatch(filterByPoblation(ev.target.value))
        setcurrentPage(1);
        setOrder(`Ordenado ${ev.target.value}`)
    }
  
    function handleFilterByContinent(e){
        dispatch(filterCountriesByContinent(e.target.value))
        setcurrentPage(1) // e.e
        setOrder(`Ordenado ${e.target.value}`)
    }

    function hadleActivities(e) {
        dispatch(filterActivities(e.target.value))
    }
    

    return (
        <React.Fragment>
                <div>
                    <h1>Countries Page</h1>
                 
                    <Link to="/activities">Create Activity</Link>
                </div>
     
                <div>
                </div>

                <button onClick={e=>{handleClick(e)}}>Reload Countries</button>
                
                <div>

                 <select onChange={e => handleFilterByContinent(e)}>
                 <option value ='All'>All</option>
                 <option value='Americas'>Americas</option>
                 <option value='Africa'>Africa</option>
                 <option value ='Asia'>Asia</option>
                 <option value ='Antarctic'>Asia</option>
                 <option value='Europe'>Europe</option>
                 <option value='Oceania'>Oceania</option>
                 </select>

                 <select onChange ={(ev) => handleFiltradoPoblacion(ev)}>
                    <option value ='asc'>Mayor Poblacion</option>
                    <option value ='desc'>Menor Poblacion</option>
                    </select>

                 <select onChange={e => handleAlfa(e)}>
                     <option value="asc">Ascending</option>
                     <option value="desc">Descending</option>
                 </select>

                 <div >
        {(activities.length === 0)? <p>Create activities to filter</p>
          : <select onChange = {e => hadleActivities(e)}>
          <option value = 'All'>Select activity</option>
          {activities.map((e)=>(
            <option value = {e.name} key={e.id}> {e.name} </option>
            ))
          }
          </select>
        }
      </div>

                </div>
                <SearchBar/>
                <Pagination
                countries = {countries.length}
                countriesPerPage={countriesPerPage}
                pagination={pagination}
                />
            <div>
            {  currentCountriesPage.length ? currentCountriesPage.map(c => {
                return(
                    <div key={c.id}>
                        <Link to={`/home/${c.id}`}>
             <Card key={c.id} name={c.name} continents={c.continents} flags={c.flags}/>
                        </Link>
                 </div>
            )}): <h1>error 404</h1>}
            </div>
            
            
            </React.Fragment>
    )
}










// POPULATION
//CONTINENTES
//ACTIVIDAD TURISTA
//ADC,DESC