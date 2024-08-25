import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import {
    PinpointAutocompleteResponse,
    PinpointDetailsResponse,
    PinpointBatchResponse,
    PinpointServiceSettings,
    IPinpointService,
} from "./index.d";

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
        this.baseUrl = settings.baseUrl || "https://pin-point.co/g/search/";
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
        const url = `${this.baseUrl}autocomplete`;
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
    ): Promise<PinpointDetailsResponse | null> {
        const url = `${this.baseUrl}details`;
        const method = "POST";
        const autocompleteData = await this.Autocomplete(location);

        const data = new URLSearchParams({
            key: this.token,
            locationid: autocompleteData[0].LocationID,
        });

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
        const url = `${this.baseUrl}batch`;
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
