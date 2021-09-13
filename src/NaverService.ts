declare global {
	interface Window { naver: any }
}

interface ButtonStyles {
	buttonColor: string;
	buttonType: string;
	buttonHeight: string;
}

export function naverService () {
	let naverLogin: any;

	const initiate = (clientId: string, callbackUrl: string, isPopup: boolean, buttonStyles: ButtonStyles) => {
		naverLogin = new window.naver.LoginWithNaverId({
			clientId,
			callbackUrl,
			isPopup,
			loginButton: {
        color: buttonStyles.buttonColor,
        type: buttonStyles.buttonType,
        height: buttonStyles.buttonHeight,
      } /* 로그인 버튼의 타입을 지정 */,
		});
		// setNaver();
	}

	const initNaver = (
		clientId: string,
		callbackUrl: string,
		isPopup: boolean,
		success: Function,
		fail: Function,
		buttonStyles: ButtonStyles
	) => {
		const scriptId = 'naver_login';
		const isExist = !!document.getElementById(scriptId);

		if (!isExist) {
			const script = document.createElement('script')
			script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js';
			script.onload = () => {
				initiate(clientId, callbackUrl, isPopup, buttonStyles);
				// naverLogin.getLoginStatus((status: boolean) => {
				// 	if (status) {
				// 		success(naverLogin);
				// 	} else {
				// 		fail();
				// 	}
				// });
			}
			script.onerror = error => console.log(error);
			script.id = scriptId;
			document.head.appendChild(script);
		}
	}
	const setNaver = () => {
		naverLogin.init();
	};

	const getUserInfo = (success, fail) => {
		// setNaver();
		naverLogin.getLoginStatus((status: boolean) => {
			if (status) {
				const email = naverLogin.user.email;
				const name = naverLogin.user.name;
				console.log(email, name);
				success(email);
			} else {
				console.log("AccessToken이 올바르지 않습니다.");
			}
		});
	};

	return {
		initNaver,
		setNaver,
		getUserInfo,
	};
};
