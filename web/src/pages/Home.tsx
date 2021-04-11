import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

import publaceLogo from '../assets/publaceLogo.svg'

import '../styles/home.css'
import api from '../services/api'

function Home() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const [login, setLogin] = useState(true)
    const { signIn } = useAuth()

    async function register() {

        await api.post('/user', {
            name, email, password
        })

        setEmail('')
        setPassword('')
        setLogin(true)
    }

    return (
        <div id="page-content">
            <div className="inputContainer">
                <img src={publaceLogo} alt="publace" />
                {login ? (
                    <>
                        <div className="inputBox">
                            <input
                                autoFocus
                                placeholder='Digite seu Email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder='Digite sua Senha'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={() => signIn(email, password)}
                        >
                            Entrar
                        </button>

                        <button
                            onClick={() => setLogin(false)}
                        >
                            Cadastre-se
                        </button>
                    </>
                ) : (
                    <div className="registerInputs">
                        <input
                            autoFocus
                            placeholder="Digite seu Nome"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <input
                            placeholder='Digite seu Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder='Digite sua Senha'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />

                        <button
                            onClick={register}
                        >
                            Cadastrar
                        </button>
                    </div>
                )}
            </div>
        </div >
    )
}

export default Home