import React,{useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import { getCountries,filterCountriesByContinent, filtradoAlfabetic } from "../actions/index";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export default function Home (){
    const dispatch = useDispatch();                                   // ejecuto dispatch en una variable
    const countries = useSelector((state)=> state.countries)          // traigo el estado que quiero
    const [currentPage, setcurrentPage] = useState(1);                // se inicia en la primera pagina
    const [countriesPerPage] = useState(10);                         //cantidad de cards que se van a mostrar por pagina
    const [,setOrden] = useState("")
    const lastCountry = currentPage * countriesPerPage;
    const firstCountry = lastCountry - countriesPerPage;
    const currentCountriesPage = countries.slice(firstCountry, lastCountry);
    const pagination = (pageNumber)=>{setcurrentPage(pageNumber)}
    
    useEffect(() =>{
        setcurrentPage(1)
        dispatch(getCountries());
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
        setOrden(`Ordenado ${e.target.value}`)
    }
  
    function handleFilterByContinent(e){
        dispatch(filterCountriesByContinent(e.target.value))
        setcurrentPage(1) // e.e
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <React.Fragment>
                <div>
                    <h1>Countries Page</h1>
                 
                    <Link to="/countrie">Create Countrie</Link>
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
                 <select onChange={e => handleAlfa(e)}>
                     <option value="asc">Ascending</option>
                     <option value="desc">Descending</option>
                 </select>
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
             <Card key={c.id} name={c.name} continents={c.continents} flags={c.flags}/>
                 </div>
            )}): <h1>Error 404</h1>}
            
        </div>
            
            </React.Fragment>
    )
}










// POPULATION
//CONTINENTES
//ACTIVIDAD TURISTA
//ADC,DESC