import React, { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const MainPage = lazy(() => import('./MainPage'));

export const Router = () => (
	<Routes>
		<Route path='/' element={<MainPage />} />
		<Route path='*' element={<Navigate to='/' />} />
	</Routes>
);
