import router from "@/plugins/router";
import store from "@/plugins/store";

/**
 * This function is used to handle network errors. It is used as a catch function in axios requests.
 *
 * @param {AxiosError} error
 */
export function $handleNetworkError(error) {
  // If the request got rejected, go to the login page to get some permissions
  // Otherwise, set the networkError value in vuex to show the snackbar saying there is an error and rethrow
  let errorMessage;
  if (error.response) {

    switch (error.response.status) {
      case 400:
        errorMessage = "Uhhhh, looks like a bad request (error 400)... Not sure how this happened. Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target=\"_blank\" class=\"text-decoration-none\">Sitecie suggestions channel on discord</a>.";
        break;
      case 401:
        errorMessage = "Woah there, looks like you're not logged in (anymore). Just log in and try again.";
        if (!this.$route.fullPath.startsWith("/login")) {
          router.push({
            path: '/login',
            query: {redirect: this.$route.query.redirect || this.$route.fullPath}
          })
        }
        break;
      case 403:
        errorMessage = "Woah there, you don't have enough authority to access this. Go to jail and DO NOT PASS GO, DO NOT COLLECT $200.";
        router.push({path: '/account',});
        break;
      case 404:
        errorMessage = "Uhhhhhhh 404 moment. This resource doesn't exist anymore. Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target=\"_blank\" class=\"text-decoration-none\">Sitecie suggestions channel on discord</a> if you think this is an error.";
        break;
      case 408:
        errorMessage = "Zzzzzzzzzzzz... there seems to have been a request timeout (error code 408). Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target=\"_blank\" class=\"text-decoration-none\">Sitecie suggestions channel on discord</a>.";
        break;
      case 413:
        errorMessage = "Your file is too large. Please compress it and try again";
        break;
      case 500:
        errorMessage = "Hm. okay. seems like the server is very confused (error code 500). Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target=\"_blank\" class=\"text-decoration-none\">Sitecie suggestions channel on discord</a>.";
        break;
      case 502:
        errorMessage = "Uh oh, the server seems to be down (error code 502). Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target=\"_blank\" class=\"text-decoration-none\">Sitecie suggestions channel on discord</a>.";
        break;
      default:
        errorMessage = `Oh no. An error happened that we don't know about (error code ${error.response.status}). Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target="_blank" class="text-decoration-none">Sitecie suggestions channel on discord</a>.`;
        break;
    }
  } else {
    errorMessage = "Oh no. An error happened that we don't know about. Please report this in the <a href='https://discord.com/channels/324285132133629963/1020245710987350047' target=\"_blank\" class=\"text-decoration-none\">Sitecie suggestions channel on discord</a>.";
  }
  store.commit('setStatusSnackbarMessage', errorMessage)
}
