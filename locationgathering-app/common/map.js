import store from '../src/store'
export function MapLoader() {   // <-- 原作者这里使用的是module.exports
    return new Promise((resolve, reject) => {
      if (window.AMap) {
        resolve(window.AMap)
      } else {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = 'https://webapi.amap.com/maps?v=1.3&callback=initAMap&key=ee6783055b48cbeb4bb28e27ab12aa3b'
        script.onerror = reject
        document.head.appendChild(script)
      }
      window.initAMap = () => {
        resolve(window.AMap)
      }
    })
  }
  export function initMap(AMap,mapBox){
    var map = new AMap.Map(mapBox, {
        zoom: 11,
        center: [117.412427, 36.303573],
        pitch: 0,
        viewMode: "3D"
      });
      return map
  }
