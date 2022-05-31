import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

// import { Loader } from "shared/ui";

export const withRouter = (component: () => React.ReactNode) => () =>
	(
		<BrowserRouter>
			<Suspense fallback={<h1>Loading</h1>}>{component()}</Suspense>
		</BrowserRouter>
	);
