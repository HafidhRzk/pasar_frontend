import routes from '../routes/sidebar'
import { NavLink, Routes, Link, useLocation } from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useDispatch } from 'react-redux';

function LeftSidebar() {
    const location = useLocation();

    const dispatch = useDispatch()

    const close = (e) => {
        document.getElementById('left-sidebar-drawer').click()
    }

    return (
        <div className="drawer-side ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
            <ul className="pt-2 menu w-80 bg-base-100 text-base-content">
                <button className="absolute top-0 right-0 z-50 mt-4 mr-2 btn btn-ghost bg-base-300 btn-circle lg:hidden" onClick={() => close()}>
                    <XMarkIcon className="inline-block w-5 h-5" />
                </button>
                <li className="mb-2 text-xl font-semibold">
                    <Link to={'/dashboard'}><img className="w-10 mask mask-squircle" src="/user.png" alt="DashWind Logo" />Pasar App</Link> </li>
                {
                    routes.map((route, k) => {
                        return (
                            <li className="" key={k}>
                                {
                                    route.submenu ?
                                        <SidebarSubmenu {...route} /> :
                                        (<NavLink
                                            end
                                            to={route.path}
                                            className={({ isActive }) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                                            {route.icon} {route.name}
                                            {
                                                location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                    aria-hidden="true"></span>) : null
                                            }
                                        </NavLink>)
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default LeftSidebar