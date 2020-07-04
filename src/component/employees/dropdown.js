import React, { useState, useEffect } from "react";

function Dropdown(props) {
  const [countries, setCountries] = useState({});

  let [state, setState] = useState({
    countries: [],
    states: [],
    cities: [],
    selectedCountry: "--Choose Country--",
    selectedState: "--Choose State--",
    selectedCity: "--Choose City--",
  });

  useEffect(() => {
    setState((pre) => ({
      ...pre,
      countries: [
        {
          name: "Afghanistan",
          states: [
            {
              name: "Badakhshan",
              cities: [
                "Murghab",
                "Ishkashim",
                "Qalaikhumb",
                "Dushambe",
                "Wakhan",
                "Baharak",
                "Baharak",
                "Fayzabad",
                "Jurm",
                "Raghistan",
              ],
            },
            {
              name: "Badghis",
              cities: [
                "Bala Murghab",
                "Ghormach",
                "Jawand",
                "Qadis",
                "Qala I Naw",
                "Sang Atesh",
              ],
            },
            {
              name: "Baghlan",
              cities: [
                "Puli Khumri",
                "Andarab",
                "Dushi",
                "Dih Salah",
                "Nahrin",
                "Puli Hisar",
              ],
            },
            {
              name: "Ghazni",
              cities: [
                "Sanai",
                "Hassan Ghaznavi",
                "Faiz Muhammad Katib Hazara",
                "Sanai",
                "Farrukhi Sistani",
              ],
            },
            {
              name: "Kabul",
              cities: [
                "Sanai",
                "Hassan Ghaznavi",
                "Faiz Muhammad Katib Hazara",
                "Sanai",
                "Farrukhi Sistani",
              ],
            },
            {
              name: "Panjshir",
              cities: ["Anaba", "Bazarak", "Dara", "Khenj", "Rokha", "Shotul"],
            },
            {
              name: "Zabol",
              cities: ["Barcelona", "dfs", "dfdsf", "wew", "sdsd", "dfdf"],
            },
            {
              name: "Kapisa",
              cities: ["Barcelona", "dfs", "dfdsf", "wew", "sdsd", "dfdf"],
            },
            {
              name: "Faryab",
              cities: ["Barcelona", "dfs", "dfdsf", "wew", "sdsd", "dfdf"],
            },
          ],
        },
        {
          name: "Australia",
          states: [
            {
              name: "Adelaide",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Victoria",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Tasmania",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Queensland",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "New South Wales",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Melborne",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Perth",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Sydney",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "South Australia",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
          ],
        },
        {
          name: "Canada",
          states: [
            {
              name: "Alberta",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "British Columbia",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Calgiri",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Saskatchewan",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Manitoba",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Saskatchewan",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Ontario",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Quebec",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
          ],
        },
        {
          name: "Bangladesh",
          states: [
            {
              name: "Barisal Division",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Chittagong",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "	Dhaka",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Mymensingh",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Rajshahi",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Rangpur",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Sylhet",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
          ],
        },
        {
          name: "Belgium",
          states: [
            {
              name: " Antwerp",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Limburg",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "	Hainaut",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Luxembourg",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Namur",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Hainaut",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
            {
              name: "Limbourg",
              cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
            },
          ],
        },
        {
          name: "Bhutan",
          states: [
            {
              name: " Bumthang",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Trongsa",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "	Punakha",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Thimphu",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Paro",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Chukha",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Samtse",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
          ],
        },
        {
          name: "Brazil",
          states: [
            {
              name: " Acre",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Rio de Janeiro",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "	Paraíba",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Sergipe",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Santa Catarina",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Rio Grande do Norte",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Roraima",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
          ],
        },
        {
          name: "Costa Rica",
          states: [
            {
              name: " San José",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Puntarenas",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "	Puntarenas",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Cartago",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Guanacaste",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Heredia",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Limón",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
          ],
        },
        {
          name: "Denmark",
          states: [
            {
              name: " Aarhus.",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Copenhagen",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "	Odense",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Funen",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "	Bornholm",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Heredia",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Limón",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
          ],
        },
        {
          name: "Denmark",
          states: [
            {
              name: " Paris.",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Bourges",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "	Orléans",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Rouen",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "	Toulouse",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Lyon",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Grenoble",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
          ],
        },
        {
          name: "Italy",
          states: [
            {
              name: " Calabria.",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Umbria",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "	Rom",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Veneto",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "	Sardinia",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Lyon",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Molise",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
          ],
        },
        {
          name: "India",
          states: [
            {
              name: " Andhra pradesh",
              cities: [
                "Visakhapatnam",
                "Vijayawada",
                "Nellore",
                "Kadapa,",
                "Machilipatnam",
                "Chittoor",
                "Amaravati ",
              ],
            },
            {
              name: "Arunachal pradesh",
              cities: ["Itanagar ", "Tawang", "Lumla", "Ziro", "Palin"],
            },
            {
              name: "	Andaman and Nicobar Islands",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Assam",
              cities: [
                "Dispur",
                "Odalguri",
                "Silchar",
                "Lakhipur",
                "Guwahati",
                "Dibrugarh",
              ],
            },
            {
              name: "	Bihar",
              cities: [
                "patna",
                "Gaya",
                "BhaglPur",
                "Purnia",
                "Darbhanga",
                "aarah",
              ],
            },
            {
              name: "Chandigarh",
              cities: ["Mani majra", "Zirakpur", "Sukhna Lake", "Rock garden"],
            },
            {
              name: "Chhattisgarh",
              cities: ["Raipur", "Bhlai", "Bilaspur", "Eschborn"],
            },
            {
              name: "Dadra and Nagar Haveli",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Delhi",
              cities: ["South Delhi", "Saket", "Rohini", "Chandni Chowk"],
            },
            {
              name: "Goa",
              cities: [
                "India Gate",
                "Rashtrapati Bhawan",
                "Qutub Minar",
                "Chattarpur Temple",
              ],
            },
            {
              name: "Gujarat",
              cities: [
                "Ahemdabad",
                "Surat",
                "Rajkot",
                "Jamnagar",
                "Jamnagar",
                "Bharuch",
              ],
            },
            {
              name: "Haryana",
              cities: [
                "Ambala",
                "Kurukshetra",
                "panchkula",
                "Karnal",
                "Panipat",
                "Sonipat",
                "Kaithal",
                "Jind",
                "Hansi",
                "Hisar",
                "Narwana",
              ],
            },
            {
              name: "Himachal Pradesh",
              cities: [
                "Shimla",
                "Dharmshala",
                "Mandi",
                "Chamba",
                "Manali",
                "Solan",
                "Kullu",
              ],
            },
            {
              name: "Jharkhand",
              cities: ["	Chirkunda", "dasdsa", "Ranchi", "Hazaribagh", "Phusro"],
            },
            {
              name: "Karnataka",
              cities: ["	Udupi", "Ranebennuru", "Gangavati", "Mysuru"],
            },
            {
              name: "Kerala",
              cities: [
                "Kochi",
                "Thiruvanatpuram",
                "Trivendram",
                "Kozikhode",
                "Thrissur",
              ],
            },
            {
              name: "Lakshadweep",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Madhya Pradesh",
              cities: ["Bhopal", "Indore", "Gwalior", "Satna"],
            },
            {
              name: "Maharashtra",
              cities: ["Pune", "Mumbai", "Nagpur", "NAsik"],
            },
            {
              name: "Manipur",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Meghalaya",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Mizoram",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Nagaland",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Orissa",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Pondicherry",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Punjab",
              cities: [
                "Sangrur",
                "Khanna",
                "Ludhiana",
                "Amritsar",
                "Mohali",
                "Firozabad",
              ],
            },
            {
              name: "Rajasthan",
              cities: ["Bikaner", "Jaisalmer", "Jaipur", "Pushkar"],
            },
            {
              name: "Sikkim",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Tamilnadu",
              cities: [
                "Chennai",
                "Coiambtur",
                "Madurai",
                "Tiruchirapalli",
                "Erode",
              ],
            },
            {
              name: "Tripura",
              cities: [
                "Agartala",
                "Udaipur",
                "Kailashahar",
                "Belonia",
                "Mohanpur",
              ],
            },
            {
              name: "Uttrakhand",
              cities: [
                "Dehradun",
                "Nanital",
                "Haridwar",
                "Massoorie",
                "Roorkee",
                "Rudrapur",
              ],
            },
            {
              name: "Uttar Pradesh",
              cities: ["Lucknow", "PrayagRaj", "Noida", "Agra"],
            },
            {
              name: "West Bengal",
              cities: ["Durgapur", "Howra", "Siliguri", "Kolkata", "Nadia"],
            },
            {
              name: "Jammu And kashmir",
              cities: [
                "Kargil",
                "Pilwama",
                "Kupwara",
                "Leh",
                "Ladakh",
                "Kathua",
              ],
            },
          ],
        },
        {
          name: "Japan",
          states: [
            {
              name: "  Kōchi.",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Kyoto",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Tokyo",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Nagasaki",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "	Heroshima",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Shizuoka",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Ōsaka",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
          ],
        },
        {
          name: "USA",
          states: [
            {
              name: "NewYork",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Alaska",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "California",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Florida",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Georgia",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Mississippi",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "New Jersey",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Washinton",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
          ],
        },
        {
          name: "New Zealand",
          states: [
            {
              name: "Northland",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Auckland",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Wellington",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Otago",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Nelson",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
          ],
        },
        {
          name: "Germany",
          states: [
            {
              name: "Berlin",
              cities: [
                "Lindau",
                "Leinfelden-Echterdingen",
                "Füssen",
                "Regensburg,",
                "Neuschwanstein",
                "Munich",
                "Zugspitze ",
                "Nürnberg Castle",
              ],
            },
            {
              name: "Baden-Wuerttemberg",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Hessen",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "Eschbor",
                "hghjgjjnj",
                "dsfdgfdgfgfg",
              ],
            },
            {
              name: "Brandenburg",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Niedersachsen",
              cities: [
                "Duesseldorf",
                "Leinfelden-Echterdingen",
                "dasdsa",
                "Eschborn",
              ],
            },
            {
              name: "Hamburg",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
            {
              name: "Thueringen",
              cities: [
                "Duesseldorf",
                "dasdsa",
                "Leinfelden-Echterdingen",
                "Eschborn",
              ],
            },
          ],
        },
        { name: "Argentina", states: [{ name: "B", cities: ["Barcelona"] }] },
        { name: "USA", states: [{ name: "C", cities: ["Downers Grove"] }] },
        { name: "Mexico", states: [{ name: "D", cities: ["Puebla"] }] },
      ],
    }));
  }, []);

  const changeCountry = (event) => {
    setState({ selectedCountry: event.target.value });
    setState({
      states: state.countries.find((cntry) => cntry.name === event.target.value)
        .states,
    });
  };

  const changeState = (event) => {
    setState({ selectedState: event.target.value });
    const stats = state.countries.find(
      (cntry) => cntry.name === state.selectedCountry
    ).states;
    setState({
      cities: stats.find((stat) => stat.name === event.target.value).cities,
    });
  };

  return (
    <div id="container">
      <div className="row">
        <div className="col-md-4">
          <label>Select Country</label>
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          <select
            placeholder="Country"
            value={state.selectedCountry}
            onChange={changeCountry}
            name="country"
            style={{ height: "30px", fontFamily: "cursive" }}
          >
            {" "}
            <option>--Choose Country--</option>
            {Object.keys(state.countries).map((e, key) => {
              return <option key={key}>{e.name}</option>;
            })}
          </select>
        </div>

        <div className="col-md-4">
          <label>State</label>
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          <select
            placeholder="State"
            value={state.selectedState}
            onChange={changeState}
            style={{ height: "30px", fontFamily: "cursive" }}
          >
            <option>--Choose State--</option>
            {Object.keys(state.states).map((e, key) => {
              return <option key={key}>{e.name}</option>;
            })}
          </select>
        </div>

        <div className="col-md-4">
          <label>City</label>
          &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
          <select
            placeholder="City"
            name="city"
            value={state.selectedCity}
            style={{ height: "30px", fontFamily: "cursive" }}
            onChange={(e) => setState({ selectedCity: e.currentTarget.value })}
          >
            <option>--Choose City--</option>
            {state.cities.map((e, key) => {
              return <option key={key}>{e}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
export default Dropdown;
