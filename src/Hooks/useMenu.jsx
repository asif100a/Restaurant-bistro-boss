import { useEffect, useState } from "react";

const useMenu = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/menu.json')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setIsLoading(false);
            })
    }, []);

    return [items, isLoading];
};

export default useMenu;