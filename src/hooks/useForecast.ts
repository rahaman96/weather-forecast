import React, { useState, useEffect, ChangeEvent } from 'react'
import { optionType, forecastType } from '../types'
const useForecast = () => {

    const [term, setTerm] = useState<string>('')
    const [limit, setLimit] = useState<number>(10)
    const [options, setOptions] = useState<any>([])
    const [originalData, setOriginalData] = useState<any>([])
    const [city, setCity] = useState<any | null>(null)
    const [forecast, setForecast] = useState<forecastType | null>(null)
    const url: string = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}`

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        console.log("yesss",window.innerHeight)
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const response = await fetch(url);
            const data: any = await response.json();
            console.log("data", data)
            setOriginalData((prevItems: any) => [...prevItems, ...data.results]);
            setOptions((prevItems: any) => [...prevItems, ...data.results]);
            setIsLoading(false);
        };

        fetchData();
    }, []);
    console.log("options", options)
    const handleScroll = () => {
        if (

            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight ||
            isLoading
        )
            return;
        setLimit(prevLimit => prevLimit + 10);

    };
    const getSearchOption = (value: string) => {
        if (value != '') {
            const results = originalData.filter((item: any) =>
                item.name.toLowerCase().includes(value.toLowerCase())
            );
            setOptions(results)
        } else {
            setOptions(originalData)
        }


    }

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        const value = e.target.value.trim()
        console.log('value', value)
        setTerm(value)
        if (value === '') return
        getSearchOption(value)
    }
    const getForecast = (city: any) => {
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${city?.coordinates?.lat
            }&lon=${city?.coordinates?.lon}&units=metric&appid=${"b89d50983802f94f12277d59267d2f45"}`
        ).then((res) => res.json())
            .then((data) => {
                const forecastData = {
                    ...data.city,
                    list: data.list.slice(0, 16),

                }
                setForecast(forecastData)
            }).catch(e => console.log(e))
    }
    const onSubmit = () => {
        if (!city) return
        console.log("city", city)
        getForecast(city)
    }
    const onOptionSelect = (option: any) => {
        console.log('opt', option.name)
        setCity(option)

    }
    useEffect(() => {
        if (city) {
            setTerm(city.name)
            setOptions([])
        }
    }, [city])
    return {
        term,
        options,
        isLoading,
        forecast,
        onInputChange,
        onOptionSelect,
        onSubmit
    }
}

export default useForecast