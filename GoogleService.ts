declare global {
    interface Window { gapi: any }
}

type GoogleServiceProps = {
	clientId: string;
	elementId: string;
	success: Function;
	fail: Function;
}

interface IGoogleService {
	initiate: Function;
}

export default class GoogleService implements IGoogleService {
	props: GoogleServiceProps;

	constructor(props: GoogleServiceProps) {
		this.props = props;
	}

	initiate() {
		const scriptId = 'google-login-sdk';
		const isExist = !!document.getElementById(scriptId);

		if (!isExist) {
			const script = document.createElement('script');
			script.src = 'https://apis.google.com/js/api:client.js';
			script.onload = () => this.loadAndAttachLoginFunc();
			script.onerror = (error) => console.log('APPEND SCRIPT ERROR - ', error);
			script.id = scriptId;

			document.head.appendChild(script);
		}	
	}

	private async loadAndAttachLoginFunc() {
		await window.gapi.load('auth2', () => {
			const auth = window.gapi.auth2.init({
				client_id: this.props.clientId,
				cookiepolicy: 'single_host_origin',
			});

			const element = document.querySelector('#' + this.props.elementId);
			auth.attachClickHandler(
				element,
				{},
				(user) => this.successCallback(user),
				(error) => this.failCallback(error)
			);
		});
	}

	private async successCallback(user) {
		console.log('GOOGLE LOGIN SUCCESS');
		const result = {
			name: await user.getBasicProfile().getName(),
		};

		this.props.success(result);
	}

	private failCallback(error) {
		console.log('GOOGLE LOGIN FAIL - ', error);
		this.props.fail();
	}
}
