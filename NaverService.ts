export function naverService () {
	let naverLogin: any;

	const initiate = (clientId: string, callbackUrl: string) => {
		naverLogin = new window.naver.LoginWithNaverId({
			clientId,
			callbackUrl,
			isPopup: false /* 팝업을 통한 연동처리 여부 */,
			loginButton: {
        color: 'green',
        type: 3,
        height: 120,
      } /* 로그인 버튼의 타입을 지정 */,
		});
		setNaver();
	}

	const initNaver = (clientId: string, callbackUrl: string) => {
		const scriptId = 'naver_login';
		const isExist = !!document.getElementById(scriptId);

		if (!isExist) {
			const script = document.createElement('script')
			script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js';
			script.onload = () => {
				initiate(clientId, callbackUrl);
				console.log(`naverLogin`, naverLogin);
				naverLogin.getLoginStatus((status: boolean) => {
					if (status) {
							const email = naverLogin.user.email;
							const name = naverLogin.user.name;
							console.log(email, name);
					} else {
							console.log("AccessToken이 올바르지 않습니다.");
					}
				});
			}
			script.onerror = error => console.log(error);
			script.id = scriptId;
			document.head.appendChild(script);
		}
	}
	const setNaver = () => {
		naverLogin.init();
	};
	const getUserInfo = () => {
		setNaver();
		naverLogin.getLoginStatus((status: boolean) => {
			if (status) {
				const email = naverLogin.user.email;
				const name = naverLogin.user.name;
				console.log(email, name);
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
