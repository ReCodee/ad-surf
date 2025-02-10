# Ad Overlay System  

## Libraries Used  

- **Axios**: An asynchronous HTTP client library for making API requests.  

## Code Logic  

1. **Ad Refresh Polling (Replaced by WebSocket)**  
   - Runs a polling mechanism that makes an API call to the **ad-stream server** every **10 seconds** to fetch a new ad.

2. **WebSocket Connection for scalable ad delivery**  
   - Established a WebSocket connection to the **ad-stream server** to receive real-time ad updates.


3. **Ad Overlay Positioning**  
   - The position of the **ad overlay** is randomly changed every **10 seconds**.  

4. **HTML5 Fullscreen API Integration**  
   - Overrides the native **fullscreen functionality** to ensure ad overlays remain visible.  
   - Applies fullscreen mode on the **video container** and **ad overlay** together.  

5. **Ad Click Behavior**  
   - Clicking on the ad opens the **ad URL** in a **new browser tab**.  

6. **Ad Click Tracking**  
   - Tracks the **ad click** and **hover time** to send the data to the **ad-stream server**.

7. **Animation**  
   - The ad overlay uses a simple **CSS animations**.





