import React, { useState } from 'react'
import { FiX } from 'react-icons/fi'

import '../styles/components/alert.css'

function Alert() {

    const [radius, setRadius] = useState('')
    const [isAlertOpened, setIsAlertOpened] = useState(true)

    return (
        isAlertOpened && (
            <div className="overlay">
                <div className="container">
                    <input
                        placeholder="Digite o Raio"
                        value={radius}
                        onChange={e => setRadius(e.target.value)}
                    />

                    <button type="button" onClick={() => setIsAlertOpened(false)}>
                        <FiX size={30} />
                    </button>
                </div>
            </div>
        )
    )
}

export default Alert