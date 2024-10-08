import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * ข้อมูลที่ได้จากการค้นหาสถานที่ด้วย Pinpoint Detials ประกอบด้วยข้อมูลพื้นฐานของสถานที่
 * @property LocationID รหัสสถานที่
 * @property BusinessName ชื่อธุรกิจ
 * @property HouseNumber หมายเลขที่อยู่
 * @property PremiseName ชื่ออาคาร
 * @property PremiseLaneName ชื่อซอย
 * @property Moo หมู่ที่
 * @property StreetLeadingType คำนำหน้าถนน
 * @property StreetName ชื่อถนน
 * @property StreetTrailingType คำตามท้ายถนน
 * @property SubStreetLeadingType คำนำหน้าซอย
 * @property SubStreetName ชื่อซอย
 * @property SubStreetTrailingType คำตามท้ายซอย
 * @property StreetFullName ชื่อถนนเต็ม
 * @property SubDistrictPrefix คำนำหน้าตำบล
 * @property SubDistrict ตำบล
 * @property DistrictPrefix คำนำหน้าอำเภอ
 * @property District อำเภอ
 * @property ProvincePrefix คำนำหน้าจังหวัด
 * @property Province จังหวัด
 * @property LanguageCode รหัสภาษา
 * @property LAT_LON พิกัดละติจูดลองจิจูด
 * @property PostalCode รหัสไปรษณีย์
 * @property FormattedAddress ที่อยู่ที่จัดรูปแบบแล้ว
 */
export interface PinpointDetailsResponse {
    LocationID: string;
    BusinessName: string | null;
    HouseNumber: string | null;
    PremiseName: string | null;
    PremiseLaneName: string | null;
    Moo: string | null;
    StreetLeadingType: string | null;
    StreetName: string | null;
    StreetTrailingType: string | null;
    SubStreetLeadingType: string | null;
    SubStreetName: string | null;
    SubStreetTrailingType: string | null;
    StreetFullName: string | null;
    SubDistrictPrefix: string | null;
    SubDistrict: string;
    DistrictPrefix: string | null;
    District: string;
    ProvincePrefix: string | null;
    Province: string;
    LanguageCode: string;
    LAT_LON: string;
    PostalCode: string;
    FormattedAddress: string;
}

/**
 * ข้อมูลที่ได้จากการค้นหาสถานที่ด้วย Pinpoint Autocomplete ประกอบด้วยข้อมูลพื้นฐานของสถานที่
 * @property LocationID รหัสสถานที่
 * @property FormattedAddress ที่อยู่ที่จัดรูปแบบแล้ว
 */
export interface PinpointAutocompleteResponse {
    LocationID: string;
    FormattedAddress: string;
}

/**
 * ข้อมูลที่ได้จากการค้นหาสถานที่ด้วย Pinpoint Batch ประกอบด้วยข้อมูลพื้นฐานของสถานที่
 * @property success สถานะของการค้นหา
 * @property fields ชื่อฟิลด์ที่ใช้ในการค้นหา
 * @property data ข้อมูลที่ได้จากการค้นหา
 * @property data.input ข้อความที่ใช้ในการค้นหา
 * @property data.result ผลลัพธ์การค้นหา
 * @property data.result.type ประเภทของสถานที่ที่ค้นหา
 * @property data.result.grade ระดับความถูกต้องของการจับคู่ที่อยู่
 * - A: สำหรับกรุงเทพฯ ผลลัพธ์ตรงกับบ้านเลขที่, ชื่อหมู่บ้าน/โครงการ, ซอย/ถนน, แขวง/ตำบล, เขต/อำเภอ, จังหวัด. สำหรับพื้นที่อื่น ผลลัพธ์ตรงกับบ้านเลขที่, ชื่อหมู่บ้าน/โครงการ, ซอย/ถนน, ตำบล, อำเภอ, จังหวัด.
 * - B+: สำหรับกรุงเทพฯ ผลลัพธ์ตรงกับชื่อหมู่บ้าน/โครงการ, ซอย, แขวง/ตำบล, เขต/อำเภอ, จังหวัด. สำหรับพื้นที่อื่น ผลลัพธ์ตรงกับหมู่บ้าน/หมู่, ตำบล, อำเภอ, จังหวัด.
 * - B: ผลลัพธ์ตรงกับถนน, ตำบล, อำเภอ, จังหวัด.
 * - C: ผลลัพธ์ตรงกับตำบล, อำเภอ, จังหวัด.
 * - D: ผลลัพธ์ตรงกับอำเภอ, จังหวัด.
 * - E: ผลลัพธ์ตรงกับจังหวัด.
 * - F: ไม่พบผลลัพธ์ที่ตรงกัน.
 * - "-": ผลลัพธ์ตรงกับสถานที่สำคัญ (จุดสนใจ เช่น แลนด์มาร์ก).
 * @property data.result.match ข้อมูลที่ได้จากการค้นหา
 * @property data.result.score คะแนนความถูกต้องของการจับคู่ที่อยู่
 */
export interface PinpointBatchResponse {
    success: boolean;
    fields: (keyof PinpointDetailsResponse)[];
    data: {
        input: string;
        result: {
            type: "address" | "point_of_interest" | "business";
            grade: "A" | "B+" | "B" | "C" | "D" | "E" | "F" | "-";
            match: PinpointDetailsResponse[];
            score: number;
        };
    }[];
}

/**
 * ข้อมูลการตั้งค่าของ Pinpoint Service
 * @property token โทเคนสำหรับใช้งาน API ของ Pinpoint
 * @property referer ที่อยู่ URL ของเว็บไซต์ที่ใช้งาน API ของ Pinpoint
 * @property baseUrl ที่อยู่ URL ของ API ของ Pinpoint (ค่าดีฟอลต์คือ https://pin-point.co/g/search/)
 */
export interface PinpointServiceSettings {
    token: string;
    referer: string;
    baseUrl?: string; // Optional, with a default value
}

/**
 * คลาสที่ใช้สำหรับเรียกใช้งาน API ของ Pinpoint สำหรับการค้นหาสถานที่ ทำงานบน Server side เท่านั้น
 * @method getAutocomplete ทำการค้นหา Autocomplete โดยการส่งคำค้นหา เช่น ที่อยู่ ชื่อสถานที่ หรือพิกัดในประเทศไทย
 * @method getDetails ทำการขอรายละเอียดของสถานที่จาก Location ID ที่ได้จากการค้นหา Autocomplete
 * @method getBatchDetails ทำการขอรายละเอียดของหลายสถานที่พร้อมกัน (สูงสุด 50 รายการ)
 */
export interface IPinpointService {
    Autocomplete(
        location: string,
        maxResult?: number,
    ): Promise<PinpointAutocompleteResponse[]>;
    Details(
        location: string,
        languageCode?: "th" | "en",
    ): Promise<PinpointDetailsResponse | null>;
    BatchDetails(location: string[]): Promise<PinpointBatchResponse | null>;
}

/**
 * คลาสที่ใช้สำหรับเรียกใช้งาน API ของ Pinpoint สำหรับการค้นหาสถานที่ ทำงานบน Server side เท่านั้น
 */
export default class PinpointService implements IPinpointService {
    private readonly token: string;
    private readonly referer: string;
    private readonly baseUrl: string;

    constructor(settings: PinpointServiceSettings) {
        this.token = settings.token;
        this.referer = settings.referer;
        this.baseUrl = settings.baseUrl || "https://pin-point.co/g/search";
    }

    private getHeaders() {
        return {
            Referer: this.referer,
            "Content-Type": "application/x-www-form-urlencoded",
        };
    }

    /**
     * ทำการค้นหา Autocomplete โดยการส่งคำค้นหา เช่น ที่อยู่ ชื่อสถานที่ หรือพิกัดในประเทศไทย
     * เพื่อช่วยในการเลือกสถานที่ที่ผู้ใช้ต้องการ ระบบจะคืนค่าผลลัพธ์สูงสุด 10 รายการที่เรียงตามความเกี่ยวข้อง
     * แต่ละคำขอจะใช้เครดิต 1 หน่วยสำหรับการค้นหาที่อยู่ และ 5 หน่วยสำหรับการค้นหาพิกัด
     *
     * @param location ข้อความค้นหา เช่น ที่อยู่หรือชื่อสถานที่
     * @param maxResult จำนวนผลลัพธ์สูงสุดที่ต้องการ (ค่าดีฟอลต์คือ 1)
     * @returns ผลลัพธ์การค้นหาแบบ Autocomplete
     */
    public async Autocomplete(
        location: string,
        maxResult = 1,
    ): Promise<PinpointAutocompleteResponse[]> {
        const url = `${this.baseUrl}/autocomplete`;
        const method = "POST";
        const data = new URLSearchParams({
            keyword: location,
            key: this.token,
            maxResult: maxResult.toString(),
        });

        const config: AxiosRequestConfig = {
            method,
            url,
            data,
            headers: this.getHeaders(),
        };

        try {
            const response: AxiosResponse<{
                data: PinpointAutocompleteResponse[];
            }> = await axios(config);
            return response.data.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    /**
     * ทำการขอรายละเอียดของสถานที่จาก Location ID ที่ได้จากการค้นหา Autocomplete
     * โดยจะคืนค่าข้อมูลที่สมบูรณ์ เช่น ที่อยู่ ชื่อสถานที่ ชื่อธุรกิจ เป็นต้น
     * แต่ละคำขอจะใช้เครดิต 10 หน่วย
     *
     * @param location สถานที่ที่จะขอรายละเอียด
     * @returns ข้อมูลรายละเอียดของสถานที่หรือที่อยู่
     */
    public async Details(
        location: string,
        languageCode?: "th" | "en",
    ): Promise<PinpointDetailsResponse | null> {
        let url: string = `${this.baseUrl}/details`;

        const params: {
            key: string;
            locationid: string;
            languageCode?: "th" | "en";
        } = {
            key: this.token,
            locationid: "",
        };

        if (languageCode) {
            url = `${this.baseUrl}/detailsLanguage`;
            params["languageCode"] = languageCode;
        }

        const method = "POST";
        const autocompleteData = await this.Autocomplete(location);

        if (autocompleteData.length === 0) {
            return null;
        }
        params.locationid = autocompleteData[0].LocationID;

        const data = new URLSearchParams(params);

        const config: AxiosRequestConfig = {
            method,
            url,
            data,
            headers: this.getHeaders(),
        };

        try {
            const response: AxiosResponse<{ data: PinpointDetailsResponse }> =
                await axios(config);
            return response.data.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /**
     * ทำการขอรายละเอียดของหลายสถานที่พร้อมกัน (สูงสุด 50 รายการ)
     * โดยคืนค่าผลลัพธ์การค้นหาที่แสดงระดับความถูกต้องของการจับคู่ที่อยู่
     * แต่ละคำขอจะใช้เครดิต 30 หน่วยต่อ 1 ที่อยู่
     *
     * @param locations รายการสถานที่ที่ต้องการขอรายละเอียด
     * @returns ผลลัพธ์การค้นหาแบบ Batch
     */
    public async BatchDetails(
        locations: string[],
    ): Promise<PinpointBatchResponse | null> {
        const url = `${this.baseUrl}/batch`;
        const method = "POST";
        const data = locations.map((location) => ({ input: location }));

        const config: AxiosRequestConfig = {
            method,
            url,
            data: { key: this.token, data }, // Adjust this based on your API's expected format
            headers: this.getHeaders(),
        };

        try {
            const response: AxiosResponse<PinpointBatchResponse> = await axios(
                config,
            );
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}
