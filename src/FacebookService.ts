declare global {
	interface Window {
		fbAsyncInit: any;
		FB: any;
	}
}

export async function loadInitFacebook(appId: string) {
	await loadFacebookSDK('facebook-jssdk');
	await initFacebook(appId);

	// window.FB.login((response: any) => {
	// 	if (response.authResponse) {
	// 		alert("You are logged in &amp; cookie set!");
	// 	} else {
	// 		alert("User cancelled login or did not fully authorize.");
	// 	}
	// });
	// return false;
}

async function initFacebook(appId: string){
	window.fbAsyncInit = function() {
		window.FB.init({
			appId,
			autoLogAppEvents: true,
			xfbml: true,
			version: 'v11.0'
		});
	};
}

async function loadFacebookSDK(id: string) {
	let js,
	fjs = document.getElementsByTagName('script')[0];

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

export async function loginWithFacebook(){
	window.FB.login(function(response: any) {

	if (response.authResponse) {
		console.log('Welcome!  Fetching your information.... ');
		//console.log(response); // dump complete info
		let access_token = response.authResponse.accessToken; //get access token
		let user_id = response.authResponse.userID; //get FB UID

		console.log(`access_token`, access_token);
		console.log(`user_id`, user_id);

		window.FB.api('/me', function(response: any) {
		let user_email = response.email; //get user email

		console.log(`user_email`, user_email);
	// you can store this data into your database             
		});

	} else {
		//user hit cancel button
		console.log('User cancelled login or did not fully authorize.');

	}
	}, {
		scope: 'public_profile,email'
	});
}
