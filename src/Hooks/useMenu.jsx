// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
    // const [items, setItems] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // useEffect(() => {
    //     fetch('https://restaurant-bistro-boss.vercel.app/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             setItems(data);
    //             setIsLoading(false);
    //         })
    // }, []);

const {data: items= [], isLoading, refetch} = useQuery({

    queryKey: ['menu'],
    queryFn: async() => {
       const {data} = await axiosPublic.get('/menu');
       return data;
    }
});

    return [items, isLoading, refetch];
};

export default useMenu;