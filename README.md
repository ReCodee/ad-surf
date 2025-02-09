## Libraries:

    - axios: async http client library.

## Code Logic:

    - Runs a poll which makes an API call to the ad-stream server after every 10 seconds to refresh the ad.
    - After every 10 seconds, position of the Ad overlay is changed to a random position.
    - Utilizing HTML5 Fullscreen API to override the native functionality, Due to HTML5 native functionality it overrides all the overlays placed on the screen.
    - Using HTML5 Fullscreen API, fullscreen is applied on the div container video and ad overlay.
    - Upon clicking the ad a new url is opened in a new browser tab.
