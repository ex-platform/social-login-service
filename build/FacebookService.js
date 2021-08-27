export async function loadInitFacebook(appId) {
    await loadFacebookSDK('facebook-jssdk');
    await initFacebook(appId);
}
async function initFacebook(appId) {
    window.fbAsyncInit = function () {
        window.FB.init({
            appId,
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v11.0'
        });
    };
}
async function loadFacebookSDK(id) {
    let js, fjs = document.getElementsByTagName('script')[0];
    if (document.getElementById(id)) {
        return;
    }
    js = document.createElement('script');
    js.id = id;
    js.src = 'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v11.0';
    js.async = true;
    if (fjs.parentNode) {
        fjs.parentNode.insertBefore(js, fjs);
    }
}
export async function loginWithFacebook(success, fail) {
    window.FB.login(function (response) {
        if (response.authResponse) {
            let access_token = response.authResponse.accessToken; //get access token
            let user_id = response.authResponse.userID; //get FB UID
            console.log(`access_token`, access_token);
            console.log(`user_id`, user_id);
            window.FB.api('/me', function (response) {
                if (response) {
                    success(response);
                }
                else {
                    fail();
                }
            });
        }
        else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'public_profile,email'
    });
}
//# sourceMappingURL=FacebookService.js.map