export default class KakaoService {
    constructor(props) {
        this.props = props;
    }
    initiate() {
        const scriptId = 'kakao-login-sdk';
        const isExist = !!document.getElementById(scriptId);
        if (!isExist) {
            const script = document.createElement('script');
            script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
            script.onload = () => window.Kakao.init(this.props.apiKey);
            script.onerror = (error) => console.log('APPEND SCRIPT ERROR - ', error);
            script.id = scriptId;
            document.head.appendChild(script);
        }
    }
    async login() {
        await window.Kakao.Auth.login({
            success: () => this.getUserInfo(),
            fail: (error) => {
                console.log('KAKAO LOGIN ERROR - ', error);
                this.props.fail(error);
            }
        });
    }
    async getUserInfo() {
        await window.Kakao.API.request({
            url: '/v2/user/me',
            success: (userInfo) => {
                console.log('GET KAKAO USER INFO - ', userInfo);
                this.props.success(userInfo);
            },
            fail: (error) => {
                console.log('GET KAKAO USER INFO - ', error);
                this.props.fail(error);
            },
        });
    }
}
//# sourceMappingURL=KakaoService.js.map