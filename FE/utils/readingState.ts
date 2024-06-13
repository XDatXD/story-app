import { ReadingState } from "@/schema/ReadingState";

export const saveReadingState = (state: ReadingState) => {
    const prevStateStorage = localStorage.getItem("state") || "[]";
    const prevState: ReadingState[] = JSON.parse(prevStateStorage);
    if (!prevState.length) {
        const arr = new Array(state);
        localStorage.setItem("state", JSON.stringify(arr));
    } else {
        if (
            !getReadingState({
                href: state.href,
                chapterTitle: state.chapterTitle,
                novelTitle: state.novelTitle,
            })
        ) {
            prevState.unshift(state);
            localStorage.setItem("state", JSON.stringify(prevState));
        } else {
            const newState = prevState.map((curr) => {
                if (
                    curr.chapterTitle === state.chapterTitle &&
                    curr.novelTitle === state.novelTitle &&
                    curr.href === state.href
                ) {
                    curr.position = state.position;
                }
                return curr;
            });
            localStorage.setItem("state", JSON.stringify(newState));
        }
    }
};

export const getReadingState = ({
    href,
    chapterTitle,
    novelTitle,
}: {
    href: string;
    chapterTitle: string;
    novelTitle: string;
}) => {
    const states: ReadingState[] = JSON.parse(
        localStorage.getItem("state") || "[]"
    );
    const found = states.find(
        (state) =>
            chapterTitle === state.chapterTitle &&
            novelTitle === state.novelTitle &&
            href === state.href
    );
    return found;
};

export const getReadingStates = () => {
    const states: ReadingState[] = JSON.parse(
        localStorage.getItem("state") || "[]"
    );
    return states;
};
