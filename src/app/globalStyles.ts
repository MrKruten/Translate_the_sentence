import { css } from '@linaria/core';

export const globals = css`
	:global() {
		@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
		// null style
		* {
			padding: 0;
			margin: 0;
			border: 0;
		}

		*,
		*:before,
		*:after {
			-moz-box-sizing: border-box;
			-webkit-box-sizing: border-box;
			box-sizing: border-box;
		}

		:focus,
		:active {
			outline: none;
		}

		a:focus,
		a:active {
			outline: none;
		}

		nav,
		footer,
		header,
		aside {
			display: block;
		}

		html,
		body {
			height: 100%;
			width: 100%;
			font-size: 100%;
			line-height: 1;
			-ms-text-size-adjust: 100%;
			-moz-text-size-adjust: 100%;
			-webkit-text-size-adjust: 100%;
		}

		input,
		button,
		textarea {
			font-family: inherit;
		}

		input::-ms-clear {
			display: none;
		}

		button {
			background: none;
			cursor: pointer;
		}

		button::-moz-focus-inner {
			padding: 0;
			border: 0;
		}

		a,
		a:visited {
			text-decoration: none;
		}

		a:hover {
			text-decoration: none;
		}

		ul li {
			list-style: none;
		}

		img {
			vertical-align: top;
		}

		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			font-size: inherit;
			font-weight: 400;
		}
		// main
		body {
			margin: 0;
			min-height: 100%;
			font-family: 'Roboto', sans-serif;
			font-size: 18px;
			font-weight: 400;
			line-height: 21px;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			background-color: #f5f5f5;
		}
		#root,
		#app {
			height: 100%;
		}
	}
`;
