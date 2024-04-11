import { Stack, StackItem } from "@fluentui/react";
import axios from "axios";
import * as React from "react";
import { Card } from "./Card";

export const ProfileCards = () => {
    const [cardsData, setCardsData] = React.useState<any[]>([]);

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/Users");
            setCardsData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        getData();
    }, []);

    const buildCards = React.useCallback(() => {
        if (!cardsData) {
            return null;
        }
        return cardsData.map((item: any) => {
            return (
                <StackItem>
                    <Card title={item.Username} description={item.Email} imageUrl={item.profilePicture} />
                </StackItem>
            );
        });
    }, [cardsData]);

    return (
        <Stack horizontal tokens={{ childrenGap: 8 }}>
            {buildCards()}
        </Stack>
    );
};
