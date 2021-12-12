import GeocoderService from "@mapbox/mapbox-sdk/services/geocoding";

export const accessToken =
    "pk.eyJ1IjoiZGllZ28tc3BpY2VkIiwiYSI6ImNrcmV5bnlzZzVyZ2ozMW82dDgzODdpOGwifQ.uoWpG6mE9KPcM0Q1pIY4Rg";

export const geocoder = GeocoderService({
    accessToken
});
