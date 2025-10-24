import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import * as theme from 'lib/theme';

import { NotFoundPage } from './404';
import { DashboardPage } from './dashboard';

export default () => {
    return (
        <>
            <Helmet>
                {theme.helmet}
            </Helmet>

            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </>
    );
};
