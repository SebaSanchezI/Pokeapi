import React from 'react'
import stylePagination from './styles/pagination.module.css'

 const Pagination = ({pokesPerPage, totalPokes,paginate}) => {
    const pagesNumber = []; 
    //obtengo la cantidad de paginas
    //Math.ceil devuelve el entero mayor o igual mas proximo a un numero dado
    for(let i=1;i<= Math.ceil(totalPokes/ pokesPerPage);i++){
        pagesNumber.push(i);
    }

    /*
    <button>Previus</button>
    <button>Next</button>
     */
    return (
        <div className={stylePagination.ctn}>
        <nav className={stylePagination.pagination}>
            <ul >
                    
                    {
                    pagesNumber.map(number => (
                        <div key={number} className={stylePagination.pagDiv}>
                            <li key={number} >
                                <a onClick={()=>paginate(number)} href="#" className='page-link'>
                                    {number}
                                </a>
                            </li>
                        </div>
                        
                    ))
                    }
                    
            </ul>
        </nav>
        </div>
    )
}

export default Pagination;