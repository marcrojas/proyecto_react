import userEvent from "@testing-library/user-event";
import { useState, useEffect } from "react"

const MiApi = ()=> {

    //Aquí guardo el listado de aves
    const [info, setInfo] = useState([]);
    const [infoFiltrada, setInfoFiltrada] = useState([]);
    const [valorBusqueda, setValorBusqueda] = useState("");
    const [ordena, setOrdena] = useState("asc")


    useEffect(()=>{
        muestraApi();
    }, [])

    useEffect(()=>{
        filtraDatos();
    }, [valorBusqueda])



    //Función que muestra la información de la API
    const muestraApi = ()=>{
    
        const url = 'https://aves.ninjas.cl/api/birds';
        fetch(url)
            .then((res)=> res.json())
            .then((json)=>{

                //Guardo la data en 2 arreglos, el original y el otro para filtrar
                setInfo(json)
                setInfoFiltrada(json)
            })
            .catch((e)=> console.log(e))


    }


    //Función que recibe los datos de búsqueda
    const filtraDatos = ()=>{
        //Recibo lo que escribí en el campo de texto de búsqueda (lo dejo en minúscula)
        const buscador = valorBusqueda.toLowerCase()
        
        //Aquí realizo el filtrado sobre toda la data descargada desde la API
        const filtrado = info.filter((datos)=>{
        const aves_espanol = datos.name.spanish.toLowerCase()
        const aves_ingles = datos.name.english.toLowerCase()
                
        return aves_espanol.includes(buscador) || aves_ingles.includes(buscador)

        })

        //Actualizo la información a mostrar
        setInfoFiltrada(filtrado)
    }


    const ordenarData = (infoFiltrada)=>{
        if(ordena == "asc"){
            infoFiltrada.sort((a, b)=> a - b)
        }else{
            infoFiltrada.sort((a, b)=> b - a)
        }

        return infoFiltrada

    }

  


    return(
        <div className="row">
            <div className="header">
                <div className="titulo-header">Buscador de Aves</div>
                <div className="col-5">
                    <input type="text" placeholder="Ingresa una ave" onChange={(e)=> setValorBusqueda(e.target.value)} />
                </div>
                <div className="col-5">
                    <select onChange={(e)=> setOrdena(e.target.value)}>
                        <option value="asc">Orden Ascendente</option>
                        <option value="desc">Orden Descendente</option>
                    </select>
                </div>
            </div>
            <div className="estilo-tabla-aves">
                <div className="col-8">
                    <h4>Listado de Aves Chilenas</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th className="coloresCabeceras">Nombre en Español</th>
                                <th className="coloresCabeceras">Nombre en Ingles</th>
                                <th className="coloresCabeceras">Imagen</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            infoFiltrada.map((datos)=>{
                                return(
                                    <tr key={datos.uid}>
                                        <td>
                                            {datos.name.spanish}
                                        </td>
                                        <td>
                                            {datos.name.english}
                                        </td>
                                        <td>
                                            <img src={datos.images.thumb}></img>
                                        </td>
                                    </tr>
                                
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MiApi