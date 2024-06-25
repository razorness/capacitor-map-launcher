# map-launcher

Opens coordinates in native map apps

## Install

```bash
npm install map-launcher
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

**Returns:** <code>Promise&lt;{ value: MapModel[]; }&gt;</code>

--------------------


### isMapAvailable(...)

```typescript
isMapAvailable(options: { mapType: MapType; }) => Promise<{ value: MapModel; }>
```

| Param         | Type                                                      |
| ------------- | --------------------------------------------------------- |
| **`options`** | <code>{ mapType: <a href="#maptype">MapType</a>; }</code> |

**Returns:** <code>Promise&lt;{ value: <a href="#mapmodel">MapModel</a>; }&gt;</code>

--------------------


### showMarker(...)

```typescript
showMarker(options: { mapType: MapType; url: string; lat: number; lon: number; title?: string; description?: string; }) => Promise<void>
```

| Param         | Type                                                                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **`options`** | <code>{ mapType: <a href="#maptype">MapType</a>; url: string; lat: number; lon: number; title?: string; description?: string; }</code> |

--------------------


### Interfaces


#### MapModel

| Prop              | Type                                        |
| ----------------- | ------------------------------------------- |
| **`mapType`**     | <code><a href="#maptype">MapType</a></code> |
| **`mapName`**     | <code>string</code>                         |
| **`packageName`** | <code>string</code>                         |
| **`urlPrefix`**   | <code>string</code>                         |


### Enums


#### MapType

| Members             | Value                        |
| ------------------- | ---------------------------- |
| **`APPLE`**         | <code>'apple'</code>         |
| **`GOOGLE`**        | <code>'google'</code>        |
| **`GOOGLE_GO`**     | <code>'googleGo'</code>      |
| **`AMAP`**          | <code>'amap'</code>          |
| **`BAIDU`**         | <code>'baidu'</code>         |
| **`WAZE`**          | <code>'waze'</code>          |
| **`YANDEX_MAPS`**   | <code>'yandexMaps'</code>    |
| **`YANDEX_NAVI`**   | <code>'yandexNavi'</code>    |
| **`CITYMAPPER`**    | <code>'citymapper'</code>    |
| **`MAPSWITHME`**    | <code>'mapswithme'</code>    |
| **`OSMAND`**        | <code>'osmand'</code>        |
| **`OSMANDPLUS`**    | <code>'osmandplus'</code>    |
| **`DOUBLE_GIS`**    | <code>'doubleGis'</code>     |
| **`TENCENT`**       | <code>'tencent'</code>       |
| **`HERE`**          | <code>'here'</code>          |
| **`PETAL`**         | <code>'petal'</code>         |
| **`TOMTOMGO`**      | <code>'tomtomgo'</code>      |
| **`TOMTOMGOFLEET`** | <code>'tomtomgofleet'</code> |
| **`COPILOT`**       | <code>'copilot'</code>       |
| **`SYGIC_TRUCK`**   | <code>'sygicTruck'</code>    |
| **`FLITSMEISTER`**  | <code>'flitsmeister'</code>  |
| **`TRUCKMEISTER`**  | <code>'truckmeister'</code>  |
| **`NAVER`**         | <code>'naver'</code>         |
| **`KAKAO`**         | <code>'kakao'</code>         |
| **`TMAP`**          | <code>'tmap'</code>          |
| **`MAPY_CZ`**       | <code>'mapyCz'</code>        |

</docgen-api>
