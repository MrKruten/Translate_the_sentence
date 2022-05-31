import React from 'react';

import { Router } from 'pages';
import { globals } from './globalStyles';
import { withProviders } from './providers';

const App = () => (
	<div className={globals}>
		<Router />
	</div>
);

export default withProviders(App);
