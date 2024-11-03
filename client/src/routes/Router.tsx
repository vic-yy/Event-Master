import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import EventPage from '../pages/Eventos/EventPage'
import EventEditPage from '../pages/Eventos/EventEditPage'

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={ <Login />}/>
                <Route path='/login' element={ <Login />}/>
                <Route path='/cadastro' element={ <Cadastro />}/>
                <Route path='/eventos' element={ <EventPage />}/>
                <Route path='/eventos/editar/:id' element={ <EventEditPage />}/>
            </Routes>
        </BrowserRouter>
    )
}