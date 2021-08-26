export function naverService() {
    let naverLogin;
    const initiate = (clientId, callbackUrl, isPopup, buttonStyles) => {
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
        setNaver();
    };
    const initNaver = (clientId, callbackUrl, isPopup, success, fail, buttonStyles) => {
        const scriptId = 'naver_login';
        const isExist = !!document.getElementById(scriptId);
        if (!isExist) {
            const script = document.createElement('script');
            script.src = 'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js';
            script.onload = () => {
                initiate(clientId, callbackUrl, isPopup, buttonStyles);
                naverLogin.getLoginStatus((status) => {
                    if (status) {
                        success(naverLogin);
                    }
                    else {
                        fail();
                    }
                });
            };
            script.onerror = error => console.log(error);
            script.id = scriptId;
            document.head.appendChild(script);
        }
    };
    const setNaver = () => {
        naverLogin.init();
    };
    const getUserInfo = () => {
        setNaver();
        naverLogin.getLoginStatus((status) => {
            if (status) {
                const email = naverLogin.user.email;
                const name = naverLogin.user.name;
                console.log(email, name);
            }
            else {
                console.log("AccessToken이 올바르지 않습니다.");
            }
        });
    };
    return {
        initNaver,
        setNaver,
        getUserInfo,
    };
}
;
//# sourceMappingURL=NaverService.js.map