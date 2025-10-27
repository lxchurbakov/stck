import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import * as theme from 'lib/theme';

import { NotFoundPage } from './404';
import { DashboardPage } from './dashboard';
import { ProjectPage } from './project/page';

export default () => {
    return (
        <>
            <Helmet>
                {theme.helmet}
            </Helmet>

            <Routes>
                <Route path='/' element={<DashboardPage />} />
                <Route path='/projects/:projectId' element={<ProjectPage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </>
    );
};
