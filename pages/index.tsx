import React, { useEffect } from "react";
import { Center, Text, useColorMode } from "@chakra-ui/react";
import { DateTime } from "luxon";
import Image from "next/image";

const showDate = (date: string) => {
    const arrayDate = date.split(":");
    const month = arrayDate[0];
    const day = arrayDate[1];
    const hour = arrayDate[2];
    const minute = arrayDate[3];
    const second = arrayDate[4];
    const dateToReturn = `${month} mois, ${day} jours, ${hour} heures, ${minute} minutes et ${second} secondes`;
    return dateToReturn.replaceAll("-", "");
};

const startDate = DateTime.fromJSDate(new Date("2022-10-25T00:00:00"));

const Home: React.FC = () => {
    const [date, setDate] = React.useState(
        startDate.diffNow().toFormat("MM:dd:hh:mm:ss"),
    );
    const { colorMode, setColorMode } = useColorMode();

    useEffect(() => {
        if (colorMode !== "dark") {
            setColorMode("dark");
        }
    }, []);

    useEffect(() => {
        setInterval(() => {
            setDate(
                startDate
                    .diffNow()
                    .plus({ second: 1 })
                    .toFormat("MM:dd:hh:mm:ss"),
            );
        }, 1000);
    }, [date]);

    return (
        <Center minW="100vw" minH="100vh">
            <Center bg="gray.700" p={10} rounded="md" flexDirection="column">
                <Text>Day without cigs !</Text>
                <Text>{showDate(date)}</Text>
                <Image width={100} height={100} src="/nocig.png" />
            </Center>
        </Center>
    );
};

export default Home;
