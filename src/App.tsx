import './App.css';

import Login from "./login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ChakraProvider} from '@chakra-ui/react';
import LoggedApp from "./appLogged";
import {QueryClient, QueryClientProvider,} from 'react-query'

const queryClient = new QueryClient()

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login/>}>
                        </Route>
                        <Route path='login' element={<Login/>}/>
                        <Route path='app' element={<LoggedApp/>}/>
                    </Routes>
                </BrowserRouter>
            </ChakraProvider>
        </QueryClientProvider>
    );
}

export default App;
