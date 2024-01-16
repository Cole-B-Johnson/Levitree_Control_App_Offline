import { ChangeEvent, useMemo, useState } from "react";

type RangeProps = {
    min: number;
    max: number;
    onChange: (newValue: number) => void;
    value: number;
    legend?: string;
};

const Range = (props: RangeProps) => {
    const [value, setValue] = useState(props.value);
    const [changing, setChanging] = useState(false);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        if (value === newValue) {
            return;
        }

        setValue(newValue);
    };

    const onChangeDone = () => {
        setTimeout(() => { setChanging(false); }, 500);
        props.onChange(value);
    };

    const changeStart = () => {
        setChanging(true);
    };

    useMemo(() => {
        if (value === props.value || changing) {
            return;
        }

        setValue(props.value);
    }, [props.value, value, changing]);

    return (
        <>
            <input
                type="range"
                value={value}
                onChange={onChange}
                onMouseDown={changeStart}
                onTouchEnd={onChangeDone}
                onMouseUp={onChangeDone}
                max={props.max}
                min={props.min}
                className="h-4 w-full cursor-pointer appearance-none rounded-lg bg-gray-300 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
            />
            <div
                className={`text-lg font-bold whitespace-nowrap ${props.legend && props.legend?.length > 3 ? "w-24" : "w-14"} text-right`}
            >
                {value.toFixed()}
                {props.legend}
            </div>
        </>
    );
};

export default Range;
