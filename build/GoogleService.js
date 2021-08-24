export default class GoogleService {
    constructor(props) {
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
    async loadAndAttachLoginFunc() {
        await window.gapi.load('auth2', () => {
            const auth = window.gapi.auth2.init({
                client_id: this.props.clientId,
                cookiepolicy: 'single_host_origin',
            });
            const element = document.querySelector('#' + this.props.elementId);
            auth.attachClickHandler(element, {}, (user) => this.successCallback(user), (error) => this.failCallback(error));
        });
    }
    async successCallback(user) {
        console.log('GOOGLE LOGIN SUCCESS');
        const result = {
            name: await user.getBasicProfile().getName(),
        };
        this.props.success(result);
    }
    failCallback(error) {
        console.log('GOOGLE LOGIN FAIL - ', error);
        this.props.fail();
    }
}
//# sourceMappingURL=GoogleService.js.map