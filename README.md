# Leaflet-GetFeatureInfo

## Description

### L.TileLayer.BetterWMS.js :
地図描画用のライブラリ (Leaflet) に読み込んだWMS上でGetFeatureInfo機能を有効にします。
この機能により、地質画像上をクリックすると、全国任意の場所の地質情報がポップアップ画像として得られます。 

#### 補足
本スクリプトは以下の既存スクリプトの改良版です。<br>
https://gist.github.com/rclark/6908938

外部ライブラリの「proj4」及び「jQuery」は必要ありません。

また、以下のコードを参考としています。

#### 参考
Leaflet-GetFeatureInfo :<br>
https://github.com/gsc-gsj-aist/Leaflet-GetFeatureInfo
<br>

```Javascript
//地質図、ライン、ラベルの表示
const detailLayer = L.tileLayer.betterWms('https://gbank.gsj.jp/ows/seamlessgeology200k_d', {
  layers: ['area', 'line', 'label'],
  format: 'image/png',
  transparent: true,
  opacity: 0.7,
  attribution: '<a href="https://www.gsj.jp/license/license.html" target="_blank">産総研地質調査総合センター</a>'
}).addTo(map);
```
<br>

## 注意事項

### 前提として

- **ご使用にあたり「全ては自己責任で行う」これが前提です。当方は一切の責任を負いかねます。**

## License

- **利用に際しては、各ライブラリのライセンスに従ってください。**

### Leaflet-GetFeatureInfo :
https://www.gsj.jp/license/

### Leaflet WMS + GetFeatureInfo :
https://gist.github.com/rclark/6908938

#### 出典：
産総研地質調査総合センターウェブサイト<br>
(https://gbank.gsj.jp/owscontents/lv_example.html)

