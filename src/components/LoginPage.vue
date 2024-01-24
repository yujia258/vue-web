<template>
    <div>
        <!-- Header -->
        <nav class="navbar navbar-light bg-light p-2 mb-4">
            <div class="container-fluid">
                <span class="navbar-brand h1 fw-bold">Vue Web</span>
            </div>
        </nav>

        <!-- Content -->
        <div class="container background-container h-100">
            <h2 class="text-center">Login</h2>
            <div class="row content-container">

                <!-- Username Login -->
                <div class="col ml-4">
                    <form id="form-login" @submit.prevent="login">
                        <input type="text" v-model="username" class="form-control input-text"
                            :class="{ 'is-invalid': loginFailed }" placeholder="Username" autofocus="on" autocomplete="off">
                        <input type="password" v-model="password" class="form-control input-text"
                            :class="{ 'is-invalid': loginFailed }" placeholder="Password" autocomplete="off">
                        <button type="submit" class="btn btn-login">Login Account</button>

                    </form>
                </div>
                <div class="col-1  d-flex justify-content-center align-items-center">
                    <p class="text-center">Or</p>
                </div>

                <!-- Social Media Login -->
                <div class="col mr-4">
                    <!-- Google Sign-In Button -->
                    <button @click="onGoogleLogin" class="btn socialBtn d-flex">
                        <img src="/assets/google.png" alt="Google Icon" class="socialBtn-icon" />
                        <span class="socialBtn-text">Sign in with Google</span></button>

                    <!-- Facebook Login Button -->
                    <button @click="onFacebookLogin" class="btn socialBtn d-flex">
                        <img src="/assets/facebook.png" alt="Facebook Icon" class="socialBtn-icon" />
                        <span class="socialBtn-text">Sign in with Facebook</span></button>

                    <!-- Apple Login Button -->
                    <button @click="onAppleLogin" class="btn socialBtn d-flex">
                        <img src="/assets/apple.svg" alt="Apple Icon" class="socialBtn-icon" />
                        <span class="socialBtn-text">Sign in with Apple</span></button>
                </div>
            </div>
        </div>
    </div>
</template>
  

<script src="https://apis.google.com/js/platform.js" async defer></script>
<script src="https://connect.facebook.net/en_US/sdk.js" async defer></script>
<script type="text/javascript" src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"></script>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            loginFailed: false,
            isAppleScriptLoaded: false,
        };
    },
    mounted() {
        // Google
        const gScript = document.createElement('script');
        gScript.src = 'https://apis.google.com/js/platform.js';
        gScript.async = true;
        gScript.defer = true;
        gScript.onload = () => {
            gapi.load('auth2', () => {
                gapi.auth2.init({
                    client_id: '871258431947-eh1g6t2hab2cu4fnarr56knbgoejdras.apps.googleusercontent.com',
                    scope: "email",
                    plugin_name: 'vue-web'

                });
            });
        };
        document.head.appendChild(gScript);

        // Facebook
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1097473698274988',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v10.0',
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    },
    created() {
        // Apple id
        this.loadAppleLoginScript('https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js')
            .then(() => {
                this.isAppleScriptLoaded = true;
                this.initializeAppleLogin();
                this.onAppleLoginCallback();
            })
            .catch(error => {
                console.error('Error loading Apple Sign In script:', error);
            });
    },
    methods: {
        onGoogleLogin() {
            gapi.auth2.getAuthInstance().signIn().then(
                googleUser => this.saveTokenLocally(googleUser.token),
                error => this.onSocialMediaError(error)
            );
        },
        onFacebookLogin() {
            FB.login(response => {
                if (response.authResponse) {
                    FB.api('/me', { fields: 'name,email' }, userData => {
                        this.saveTokenLocally(userData.id);
                    });
                } else {
                    console.log('Failed to login');
                }
            }, { scope: 'email' });
        },
        loadAppleLoginScript(src) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
            });
        },
        initializeAppleLogin() {
            if (this.isAppleScriptLoaded && AppleID && AppleID.auth) {
                AppleID.auth.init({
                    clientId: 'your-client-id',
                    scope: 'email',
                    redirectURI: 'your-redirect-uri',
                });
            }
        },
        onAppleLogin(data) {
            if (this.isAppleScriptLoaded && AppleID && AppleID.auth) {
                AppleID.auth.signIn();
            }
        },
        onAppleLoginCallback() {
            if (this.isAppleScriptLoaded && AppleID && AppleID.auth && AppleID.auth.parseResponse) {
                AppleID.auth.parseResponse(window.location, (response) => {
                    if (response.authorization && response.authorization.id_token) {
                        this.saveTokenLocally(response.authorization.id_token);
                    }
                });
            }
        },
        onSocialMediaError(error) {
            console.error('Social media login error', error);
        },
        login() {
            if (this.username && this.password) {
                if (this.username == "username" && this.password == "123456789") {
                    this.saveTokenLocally(Date.toString());
                }
                this.loginFailed = true;
                this.username = '';
                this.password = '';
            } else {
                this.loginFailed = true;
                console.error('Invalid username or password');
            }
        },
        saveTokenLocally(token) {
            localStorage.setItem('authToken', token);
            this.$router.push('/home');
        },
    },
};
</script>