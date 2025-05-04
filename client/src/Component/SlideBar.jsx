import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function SlideBar() {
    const { user, setUser } = useContext(AuthContext)


    const navigate = useNavigate()
    function onLogout() {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('name')
        setUser(null)
        navigate('/log')
        toast.success("Logout Successful!")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light ps-5 pe-5" style={{ backgroundColor: '#e3f2fd', }}>
            <Link className='navbar-brand' to='/' style={{ color: '#512888' }}>Mobile Store App</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-around" id="navbarNav">
                <ul className="navbar-nav">

                    {user && (
                        <>
                            <li className="nav-item active">
                                <Link className='nav-link' to='/add'>Add Mobile</Link>
                            </li>
                            <li className="nav-item active">
                                <Link className='nav-link' to='/show'>Update Mobile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/'>View Mobile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className='nav-link' to='/orders'>Orders</Link>
                            </li>
                        </>
                    )}


                </ul>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
                {user ? (
                    <>
                        <h6 style={{ margin: '5px', padding: '5px', color: '#0000D7' }}>
                            {user.name}
                        </h6>
                        <button type="button" className="btn btn-outline-info " onClick={onLogout}>Logout</button>
                    </>
                ) : (
                    <>
                    <Link to='/log' className="btn btn-outline-primary me-2">Login</Link>
                    <Link to='/reg' className="btn btn-outline-success">Register</Link>
                    </>
                )}


            </div>
        </nav>
    )
}

export default SlideBar
