/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";

const getPuzzle = async () => {
    try {
        const response = await fetch("http://localhost:3000/api/puzzle");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const POST = frames(async (ctx: any) => {
    const ws = await getPuzzle();

    // convert words array into map
    const wordsMap: any = {};

    for (const wordObj of ws.data.words) {
        wordsMap[wordObj.word] = {
            word: wordObj.word,
            path: wordObj.path,
            found: false,
        };
    }

    ws.data.words = wordsMap;

    return {
        image: (
            <div tw="flex">
                <div tw="flex flex-wrap" style={{ width: "500px" }}>
                    {ws.data.grid.flat().map((cell: string) => (
                        <div
                            tw="flex justify-center items-center"
                            style={{ width: "50px", height: "50px" }}
                        >
                            {cell}
                        </div>
                    ))}
                </div>
            </div>
        ),
        buttons: [
            <Button action="post" target="/continue">
                Submit
            </Button>,
            <Button action="post" target="/end">
                Give up liao
            </Button>,
        ],
        state: {
            ...ws.data,
        },
        textInput: " Enter word:",
    };
});
