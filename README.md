# Ad Overlay System  

## Libraries Used  

- **Axios**: An asynchronous HTTP client library for making API requests.  

## Code Logic  

1. **Ad Refresh Polling**  
   - Runs a polling mechanism that makes an API call to the **ad-stream server** every **10 seconds** to fetch a new ad.  

2. **Ad Overlay Positioning**  
   - The position of the **ad overlay** is randomly changed every **10 seconds**.  

3. **HTML5 Fullscreen API Integration**  
   - Overrides the native **fullscreen functionality** to ensure ad overlays remain visible.  
   - Applies fullscreen mode on the **video container** and **ad overlay** together.  

4. **Ad Click Behavior**  
   - Clicking on the ad opens the **ad URL** in a **new browser tab**.  
