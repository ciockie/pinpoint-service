<h1 align="center">Hi 👋, I'm Ciockie</h1>
<h3 align="center">A passionate fullstack developer from 409</h3>

<p align="left"> <img src="https://komarev.com/ghpvc/?username=ciockie&label=Profile%20views&color=0e75b6&style=flat" alt="ciockie" /> </p>

-   🔭 I’m currently working on [409RESTful API](https://github.com/ciockie/Project409)

-   🌱 I’m currently learning **Typescript**

-   👨‍💻 All of my projects are available at [https://github.com/ciockie](https://github.com/ciockie)

-   💬 Ask me about **React, ExpressJS, NGINX**

-   📫 How to reach me **ciockie.21@gmail.com**

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.chartjs.org" target="_blank" rel="noreferrer"> <img src="https://www.chartjs.org/media/logo-title.svg" alt="chartjs" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://www.linux.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="linux" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://www.microsoft.com/en-us/sql-server" target="_blank" rel="noreferrer"> <img src="https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg" alt="mssql" width="40" height="40"/> </a> <a href="https://www.nginx.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg" alt="nginx" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

<h3 align="center">Support:</h3>
<p align="center"><a align="center" href="https://ko-fi.com/ciockie"> <img align="center" src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="ciockie" /></a></p><br><br>

# บริการ API ของ Pinpoint

โครงการนี้เป็นบริการที่ใช้ TypeScript สำหรับการเชื่อมต่อกับ API ของ Pinpoint เพื่อทำการค้นหาตามสถานที่ บริการนี้ออกแบบมาให้ทำงานบนฝั่งเซิร์ฟเวอร์และให้วิธีการในการดึงข้อมูลคำแนะนำอัตโนมัติ ข้อมูลรายละเอียดสถานที่ และข้อมูลหลายสถานที่ในคราวเดียว

## สารบัญ

-   [บริการ API ของ Pinpoint](#บริการ-api-ของ-pinpoint)
-   [คุณสมบัติ](#คุณสมบัติ)
    -   [การค้นหาอัตโนมัติ (Autocomplete)](#การค้นหาอัตโนมัติ-autocomplete)
    -   [รายละเอียดสถานที่ (Details)](#รายละเอียดสถานที่-details)
    -   [รายละเอียดหลายสถานที่ (Batch)](#รายละเอียดหลายสถานที่-batchdetails)
-   [การเริ่มต้นใช้งาน](#การเริ่มต้นใช้งาน)
    -   [Installation](#installation)
    -   [รับ API Token ของคุณ](#รับ-api-token-ของคุณ)
    -   [การตั้งค่า](#การตั้งค่า)
-   [Autocomplete](#autocomplete)
    -   [พารามิเตอร์](#พารามิเตอร์-autocomplete)
    -   [ผลลัพธ์](#ผลลัพธ์-autocomplete)
-   [Details](#details)
    -   [พารามิเตอร์](#พารามิเตอร์-details)
    -   [ผลลัพธ์](#ผลลัพธ์-details)
-   [BatchDetails](#batchdetails)
    -   [พารามิเตอร์](#พารามิเตอร์-batchdetails)
    -   [ผลลัพธ์](#ผลลัพธ์-batchdetails)
-   [Authors](#authors)
-   [License](#license)

## คุณสมบัติ

-   **การค้นหาอัตโนมัติ (Autocomplete)**: ดึงข้อมูลคำแนะนำที่เกี่ยวข้องสูงสุด 10 รายการสำหรับคำค้นที่กำหนด เช่น ที่อยู่ ชื่อสถานที่ หรือพิกัดในประเทศไทย
-   **รายละเอียดสถานที่ (Detials)**: รับข้อมูลรายละเอียดทั้งหมดของสถานที่ รวมถึงที่อยู่ ชื่อ และพิกัด โดยใช้ Location ID จากผลการค้นหาอัตโนมัติ
-   **รายละเอียดหลายสถานที่ (Batch)**: ดึงข้อมูลรายละเอียดสำหรับหลายสถานที่พร้อมกัน (สูงสุด 50 สถานที่)

## การเริ่มต้นใช้งาน

### Installation

```batch
npm install pinpoint-service-api
```

### รับ API Token ของคุณ

ในการใช้ API ของ Pinpoint คุณจะต้องได้รับ API token คุณสามารถรับ token ของคุณได้โดยการสมัครที่ [เว็บไซต์ทางการของ Pinpoint](https://pin-point.co/)

### การตั้งค่า

เพื่อเริ่มใช้งาน `PinpointService` คุณต้องเริ่มต้นด้วยการกำหนดค่า API token และ referer URL ของคุณ:

```typescript
import { PinpointService, PinpointServiceSettings } from "./path/to/service";

const settings: PinpointServiceSettings = {
    token: "your-api-token",
    referer: "your-referer-url",
};

const pinpointService = new PinpointService(settings);
```

### Autocomplete

ทำการค้นหา Autocomplete โดยการส่งคำค้นหา เช่น ที่อยู่ ชื่อสถานที่ หรือพิกัดในประเทศไทย เพื่อช่วยในการเลือกสถานที่ที่ผู้ใช้ต้องการ ระบบจะคืนค่าผลลัพธ์สูงสุด 10 รายการที่เรียงตามความเกี่ยวข้อง แต่ละคำขอจะใช้เครดิต 1 หน่วยสำหรับการค้นหาที่อยู่ และ 5 หน่วยสำหรับการค้นหาพิกัด
| Parameter | Type | Description |
| :---------- | :------- | :----------------------------------------------------- |
| `location` | `string` | **Required**. ข้อความค้นหา เช่น ที่อยู่หรือชื่อสถานที่ |
| `maxResult` | `number` | จำนวนผลลัพธ์สูงสุดที่ต้องการ (Default=1, Max=10) |

```typescript
import { PinpointService, PinpointServiceSettings } from "./path/to/service";

const settings: PinpointServiceSettings = {
    token: "your-api-token",
    referer: "your-referer-url",
};

const pinpointService = new PinpointService(settings);
const autoComplete = pinpointService.Autocomplete("สถานที่", 5);
```

**ผลลัพธ์**

```typescript
[
    {
        LocationID: "12345",
        FormattedAddress: "123/4 ถนนพระราม 4 เขตปทุมวัน กรุงเทพฯ 10330"
    },
    ...
]
```

### Details

ทำการขอรายละเอียดของสถานที่จาก Location ID ที่ได้จากการค้นหา Autocomplete โดยจะคืนค่าข้อมูลที่สมบูรณ์ เช่น ที่อยู่ ชื่อสถานที่ ชื่อธุรกิจ เป็นต้น แต่ละคำขอจะใช้เครดิต 10 หน่วย **\*ยังไม่รองรับ languageCode**

| Parameter      | Type         | Description                                            |
| :------------- | :----------- | :----------------------------------------------------- |
| `location`     | `string`     | **Required**. ข้อความค้นหา เช่น ที่อยู่หรือชื่อสถานที่ |
| `languageCode` | `"th", "en"` | ภาษาที่แสดงผล รองรับ 2 ภาษา ไทย/อังกฤษ                 |

```typescript
import { PinpointService, PinpointServiceSettings } from "./path/to/service";

const settings: PinpointServiceSettings = {
    token: "your-api-token",
    referer: "your-referer-url",
};

const pinpointService = new PinpointService(settings);
const autoComplete = pinpointService.Details("สถานที่");
```

**ผลลัพธ์**

```typescript
{
    LocationID: "12345",
    BusinessName: null,
    HouseNumber: "123",
    PremiseName: "อาคารศูนย์การค้า",
    PremiseLaneName: "ซอยพระราม",
    Moo: null,
    StreetLeadingType: null,
    StreetName: "พระราม 4",
    StreetTrailingType: null,
    SubStreetLeadingType: null,
    SubStreetName: null,
    SubStreetTrailingType: null,
    StreetFullName: "ถนนพระราม 4",
    SubDistrictPrefix: "แขวง",
    SubDistrict: "ปทุมวัน",
    DistrictPrefix: "เขต",
    District: "ปทุมวัน",
    ProvincePrefix: "กรุงเทพมหานคร",
    Province: "กรุงเทพฯ",
    LanguageCode: "TH",
    LAT_LON: "13.746,100.533",
    PostalCode: "10330",
    FormattedAddress: "123/4 ถนนพระราม 4 เขตปทุมวัน กรุงเทพฯ 10330"
}
```

### BatchDetails

ทำการขอรายละเอียดของหลายสถานที่พร้อมกัน (สูงสุด 50 รายการ)โดยคืนค่าผลลัพธ์การค้นหาที่แสดงระดับความถูกต้องของการจับคู่ที่อยู่ แต่ละคำขอจะใช้เครดิต 30 หน่วยต่อ 1 ที่อยู่

| Parameter  | Type       | Description                                            |
| :--------- | :--------- | :----------------------------------------------------- |
| `location` | `string[]` | **Required**. ข้อความค้นหา เช่น ที่อยู่หรือชื่อสถานที่ |

```typescript
import { PinpointService, PinpointServiceSettings } from "./path/to/service";

const settings: PinpointServiceSettings = {
    token: "your-api-token",
    referer: "your-referer-url",
};

const pinpointService = new PinpointService(settings);
const autoComplete = pinpointService.Details([
    "สถานที่1",
    "สถานที่2",
    "สถานที่3",
]);
```

**ผลลัพธ์**

ข้อมูลที่ได้จากการค้นหาสถานที่ด้วย Pinpoint Batch ประกอบด้วยข้อมูลพื้นฐานของสถานที่:

-   success: สถานะของการค้นหา (true หรือ false)
-   fields: ชื่อฟิลด์ที่ใช้ในการค้นหา
-   data: ข้อมูลที่ได้จากการค้นหา
    -   input: ข้อความที่ใช้ในการค้นหา
    -   result: ผลลัพธ์การค้นหา
        -   type: ประเภทของสถานที่ที่ค้นหา (address, point_of_interest, business)
        -   grade: ระดับความถูกต้องของการจับคู่ที่อยู่
            -   A: ตรงกับบ้านเลขที่, ชื่อหมู่บ้าน/โครงการ, ซอย/ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด
            -   B+: ตรงกับชื่อหมู่บ้าน/โครงการ, ซอย, แขวง/ตำบล, เขต/อำเภอ, จังหวัด
            -   B: ตรงกับถนน, ตำบล, อำเภอ, จังหวัด
            -   C: ตรงกับตำบล, อำเภอ, จังหวัด
            -   D: ตรงกับอำเภอ, จังหวัด
            -   E: ตรงกับจังหวัด
            -   F: ไม่พบผลลัพธ์ที่ตรงกัน
            -   "-": ตรงกับสถานที่สำคัญ (จุดสนใจ เช่น แลนด์มาร์ก)
        -   match: ข้อมูลที่ได้จากการค้นหา
        -   score: คะแนนความถูกต้องของการจับคู่ที่อยู่

```typescript
{
    success: true,
    fields: [
        "LocationID",
        "BusinessName",
        "HouseNumber",
        "PremiseName",
        "PremiseLaneName",
        "Moo",
        "StreetLeadingType",
        "StreetName",
        "StreetTrailingType",
        "SubStreetLeadingType",
        "SubStreetName",
        "SubStreetTrailingType",
        "StreetFullName",
        "SubDistrictPrefix",
        "SubDistrict",
        "DistrictPrefix",
        "District",
        "ProvincePrefix",
        "Province",
        "LanguageCode",
        "LAT_LON",
        "PostalCode",
        "FormattedAddress"
    ],
    data: [
        {
            input: "สถานที่1",
            result: {
                type: "address",
                grade: "A",
                match: [
                    {
                        LocationID: "12345",
                        BusinessName: null,
                        HouseNumber: "123/4",
                        PremiseName: null,
                        PremiseLaneName: null,
                        Moo: null,
                        StreetLeadingType: null,
                        StreetName: "พระราม 4",
                        StreetTrailingType: null,
                        SubStreetLeadingType: null,
                        SubStreetName: null,
                        SubStreetTrailingType: null,
                        StreetFullName: "ถนนพระราม 4",
                        SubDistrictPrefix: null,
                        SubDistrict: "ปทุมวัน",
                        DistrictPrefix: null,
                        District: "ปทุมวัน",
                        ProvincePrefix: null,
                        Province: "กรุงเทพฯ",
                        LanguageCode: "th",
                        LAT_LON: "13.746,100.533",
                        PostalCode: "10330",
                        FormattedAddress: "123/4 ถนนพระราม 4 เขตปทุมวัน กรุงเทพฯ 10330",
                    }
                ]
            }
        },
        {
            input: "สถานที่2",
            result: {
                type: "point_of_interest",
                grade: "B+",
                match: [
                    {
                        LocationID: "67890",
                        BusinessName: null,
                        HouseNumber: "678/9",
                        PremiseName: null,
                        PremiseLaneName: null,
                        Moo: null,
                        StreetLeadingType: null,
                        StreetName: "รัชดาภิเษก",
                        StreetTrailingType: null,
                        SubStreetLeadingType: null,
                        SubStreetName: null,
                        SubStreetTrailingType: null,
                        StreetFullName: "ถนนรัชดาภิเษก",
                        SubDistrictPrefix: null,
                        SubDistrict: "ดินแดง",
                        DistrictPrefix: null,
                        District: "ดินแดง",
                        ProvincePrefix: null,
                        Province: "กรุงเทพฯ",
                        LanguageCode: "th",
                        LAT_LON: "13.764,100.537",
                        PostalCode: "10400",
                        FormattedAddress: "678/9 ถนนรัชดาภิเษก เขตดินแดง กรุงเทพฯ 10400",
                    }
                ]
            }
        }
    ]
}
```

## Authors

-   [@ciockie](https://www.github.com/ciockie)

## License

[MIT](https://choosealicense.com/licenses/mit/)
