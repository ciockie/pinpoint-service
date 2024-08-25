import axios, { AxiosStatic } from "axios";
import { PinpointService } from "../src";
import {
    PinpointAutocompleteResponse,
    PinpointDetailsResponse,
    PinpointBatchResponse,
} from "../src/index.d";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<AxiosStatic>;

describe("PinpointService", () => {
    const settings = {
        token: "e1da1fb7e098145b9028f981a8d2781eefa011598d1c99ea0eb5e4dd00460beaccb81ef88b98fee8",
        referer: "test",
        baseUrl: "https://pin-point.co/g/search/", // Add baseUrl here
    };
    const pinpointService = new PinpointService(settings);

    it("should return autocomplete results", async () => {
        const mockResponse = {
            data: {
                data: [
                    {
                        LocationID: "58f34fd3-bd66-4632-a2a3-86bcdc70a486",
                        FormattedAddress:
                            "78 หมู่ 1 ตำบลตันหยงลิมอ อำเภอระแงะ จังหวัดนราธิวาส 96130",
                    },
                ] as PinpointAutocompleteResponse[],
            },
        };

        mockedAxios.request.mockResolvedValueOnce(mockResponse);

        const results = await pinpointService.Autocomplete(
            "78 หมู่ 1 ตำบลตันหยงลิมอ อำเภอระแงะ จังหวัดนราธิวาส",
        );
        console.log(results);
        console.log(mockResponse.data.data);
        expect(results).toEqual(mockResponse.data.data);
        expect(mockedAxios.request).toHaveBeenCalledWith(
            expect.objectContaining({
                method: "POST",
                url: `${settings.baseUrl}autocomplete`, // Now settings.baseUrl is available
            }),
        );
    });

    it("should return location details", async () => {
        const mockAutocompleteResponse = {
            data: {
                data: [
                    {
                        LocationID: "12345",
                        FormattedAddress: "123 Test Street",
                    },
                ],
            },
        };
        const mockDetailsResponse = {
            data: {
                LocationID: "12345",
                BusinessName: "Test Business",
            } as PinpointDetailsResponse,
        };

        mockedAxios.request.mockResolvedValueOnce(mockAutocompleteResponse);
        mockedAxios.request.mockResolvedValueOnce(mockDetailsResponse);

        const details = await pinpointService.Details("Test Location");
        expect(details).toEqual(mockDetailsResponse.data);
        expect(mockedAxios.request).toHaveBeenCalledTimes(2);
    });

    it("should return batch details", async () => {
        const fields: (keyof PinpointDetailsResponse)[] = [
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
            "FormattedAddress",
        ];
        const mockBatchResponse: PinpointBatchResponse = {
            success: true,
            fields: fields,
            data: [
                {
                    input: "Test Location 1",
                    result: {
                        type: "address",
                        grade: "A",
                        score: 100,
                        match: [
                            {
                                LocationID: "12345",
                                BusinessName: "Test Business",
                                HouseNumber: "123/4",
                                PremiseName: "Test Premise",
                                PremiseLaneName: "Test Lane",
                                Moo: "1",
                                StreetLeadingType: "So",
                                StreetName: "Test Street",
                                StreetTrailingType: "",
                                SubStreetLeadingType: "",
                                SubStreetName: "",
                                SubStreetTrailingType: "",
                                StreetFullName: "Test Street",
                                SubDistrictPrefix: "Sub",
                                SubDistrict: "Test Subdistrict",
                                DistrictPrefix: "District",
                                District: "Test District",
                                ProvincePrefix: "Province",
                                Province: "Test Province",
                                LanguageCode: "TH",
                                LAT_LON: "13.746,100.533",
                                PostalCode: "10330",
                                FormattedAddress:
                                    "123/4 Test Street, Test Subdistrict, Test District, Test Province, 10330",
                            },
                        ],
                    },
                },
            ],
        };
        mockedAxios.request.mockResolvedValueOnce({ data: mockBatchResponse });

        const batchDetails = await pinpointService.BatchDetails([
            "Test Location 1",
            "Test Location 2",
        ]);
        expect(batchDetails).toEqual(mockBatchResponse);
        expect(mockedAxios.request).toHaveBeenCalledWith(
            expect.objectContaining({
                method: "POST",
                url: `${settings.baseUrl}batch`, // Now settings.baseUrl is available
            }),
        );
    });
});
