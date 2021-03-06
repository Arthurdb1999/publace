import React from 'react'

import { useAuth } from '../contexts/AuthContext'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

function Routes() {
    const { signed } = useAuth()

    return signed ? <AppRoutes /> : <AuthRoutes />
}

export default Routes