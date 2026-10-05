# capacitor-map-launcher

Opens coordinates in native map apps

## Install

```bash
npm install capacitor-map-launcher
npx cap sync
```

## API

<docgen-index>

* [`getInstalledMaps()`](#getinstalledmaps)
* [`isMapAvailable(...)`](#ismapavailable)
* [`showMarker(...)`](#showmarker)
* [Interfaces](#interfaces)
* [Enums](#enums)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### getInstalledMaps()

```typescript
getInstalledMaps() => Promise<{ value: MapModel[]; }>
```

Lists the supported map apps that are installed on the device.

On iOS, an app is only detected if its URL scheme is listed under
`LSApplicationQueriesSchemes` in the app's `Info.plist`.

**Returns:** <code>Promise&lt;{ value: MapModel[]; }&gt;</code>

--------------------


### isMapAvailable(...)

```typescript
isMapAvailable(options: { mapType: MapType; }) => Promise<{ value: boolean; }>
```

Checks whether the given map app is installed.

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code>{ mapType: <a href="#maptype">MapType</a>; }</code> |

**Returns:** <code>Promise&lt;{ value: boolean; }&gt;</code>

--------------------


### showMarker(...)

```typescript
showMarker(options: { mapType: MapType; url: string; lat: number; lon: number; title?: string; description?: string; }) => Promise<void>
```

Opens a marker in the given map app.

Prefer the exported `showMarker()` helper, which builds the app-specific `url` for you.
Rejects with code `MAP_NOT_AVAILABLE` if the app is not installed.

| Param         | Type                                                                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ mapType: <a href="#maptype">MapType</a>; url: string; lat: number; lon: number; title?: string; description?: string; }</code> |

--------------------


### Interfaces


#### MapModel

| Prop              | Type                                        | Description                                        |
| ----------------- | ------------------------------------------- | -------------------------------------------------- |
| **`mapType`**     | <code><a href="#maptype">MapType</a></code> |                                                    |
| **`mapName`**     | <code>string</code>                         | Human-readable name, e.g. "Google Maps".           |
| **`packageName`** | <code>string</code>                         | Android package name. Only set on Android.         |
| **`urlPrefix`**   | <code>string</code>                         | URL scheme used to detect the app, e.g. "waze://". |


### Enums


#### MapType

| Members             | Value                        | Description                                |
| ------------------- | ---------------------------- | ------------------------------------------ |
| **`APPLE`**         | <code>'apple'</code>         | Apple Maps. Only available on iOS.         |
| **`GOOGLE`**        | <code>'google'</code>        | Google Maps                                |
| **`GOOGLE_GO`**     | <code>'googleGo'</code>      | Google Maps Go. Only available on Android. |
| **`AMAP`**          | <code>'amap'</code>          | Amap (Gaode Maps)                          |
| **`BAIDU`**         | <code>'baidu'</code>         | Baidu Maps                                 |
| **`WAZE`**          | <code>'waze'</code>          | Waze                                       |
| **`YANDEX_MAPS`**   | <code>'yandexMaps'</code>    | Yandex Maps                                |
| **`YANDEX_NAVI`**   | <code>'yandexNavi'</code>    | Yandex Navi                                |
| **`CITYMAPPER`**    | <code>'citymapper'</code>    | Citymapper                                 |
| **`MAPSWITHME`**    | <code>'mapswithme'</code>    | MAPS.ME                                    |
| **`OSMAND`**        | <code>'osmand'</code>        | OsmAnd                                     |
| **`OSMANDPLUS`**    | <code>'osmandplus'</code>    | OsmAnd+. Only available on Android.        |
| **`DOUBLE_GIS`**    | <code>'doubleGis'</code>     | 2GIS                                       |
| **`TENCENT`**       | <code>'tencent'</code>       | Tencent (QQ Maps)                          |
| **`HERE`**          | <code>'here'</code>          | HERE WeGo                                  |
| **`PETAL`**         | <code>'petal'</code>         | Petal Maps. Only available on Android.     |
| **`TOMTOMGO`**      | <code>'tomtomgo'</code>      | TomTom Go                                  |
| **`TOMTOMGOFLEET`** | <code>'tomtomgofleet'</code> | TomTom Go Fleet                            |
| **`COPILOT`**       | <code>'copilot'</code>       | CoPilot                                    |
| **`SYGIC_TRUCK`**   | <code>'sygicTruck'</code>    | Sygic Truck                                |
| **`FLITSMEISTER`**  | <code>'flitsmeister'</code>  | Flitsmeister. Only available on Android.   |
| **`TRUCKMEISTER`**  | <code>'truckmeister'</code>  | Truckmeister. Only available on Android.   |
| **`NAVER`**         | <code>'naver'</code>         | Naver Map                                  |
| **`KAKAO`**         | <code>'kakao'</code>         | KakaoMap                                   |
| **`TMAP`**          | <code>'tmap'</code>          | TMAP                                       |
| **`MAPY_CZ`**       | <code>'mapyCz'</code>        | Mapy.cz                                    |

</docgen-api>
