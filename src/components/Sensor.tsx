type SensorProps = {
    name?: string;
    value: string | number;
    units?: string;
}

const Sensor = (props: SensorProps) => {
    return <>
        <div className="flex w-44 flex-col items-center gap-2">
            {(props.name !== undefined) ? (
                <h6 className="w-full text-center font-semibold">
                    {props.name}
                </h6>
            ) : null}
            <div className="w-full rounded-md bg-gray-300 py-1 text-center text-lg font-bold">
                {props.value} {props.units !== undefined ? props.units : null}
            </div>
        </div>
    </>
}

export default Sensor