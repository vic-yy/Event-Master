import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'

export function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={ <Login />}/>
                <Route path='/login' element={ <Login />}/>
                <Route path='/cadastro' element={ <Cadastro />}/>
            </Routes>
        </BrowserRouter>
    )
}