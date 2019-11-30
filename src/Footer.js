import React from 'react'


 const Footer =({links})=>{
    return (
        <footer className="navbar navbar-light bg-light">
            2019 @ ABC.com
            {
                links.map(
                    ()=>
                    <li className="nav-item">
                        <link className="nav-link" 
                        to={links.path}>{links.label}</link>
                    </li>
                )
            }
        </footer>
    )
}
export default Footer;