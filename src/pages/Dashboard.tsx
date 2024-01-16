import { ResponsiveLine } from '@nivo/line'

const Dashboard = () => {
    const g1data = [
        {
            id: "Wood Chips",
            color: "#ff4444",
            data: [
                {
                    x: 0,
                    y: 20
                },
                {
                    x: 1,
                    y: 30
                },
                {
                    x: 2,
                    y: 80
                },
            ]
        },
        {
            id: "Paper Pulp",
            color: "#44ff44",
            data: [
                {
                    x: 0,
                    y: 50
                },
                {
                    x: 1,
                    y: 10
                },
                {
                    x: 2,
                    y: 10
                },
            ]
        },
        {
            id: "Water",
            color: "#4444ff",
            data: [
                {
                    x: 0,
                    y: 30
                },
                {
                    x: 1,
                    y: 60
                },
                {
                    x: 2,
                    y: 10
                },
            ]
        }
    ]

    const g2data = [
        {
            id: "Carbon Dioxide",
            color: "#ff4444",
            data: [
                {
                    x: 0,
                    y: 0
                },
                {
                    x: 1,
                    y: 200
                },
                {
                    x: 2,
                    y: 300
                },
            ]
        }
    ]

    const g3data = [
        {
            id: "Elevation",
            color: "#44ff44",
            data: [
                {
                    x: 0,
                    y: 0
                },
                {
                    x: 1,
                    y: 1.3
                },
                {
                    x: 2,
                    y: 2.8
                },
            ]
        },
    ]

    return <>
        <div className='grid grid-cols-1 xl:grid-cols-3 gap-12'>
            <div className='h-[500px] flex flex-col items-center'>
                <h1 className="font-sans text-2xl font-light">Slurry Composition</h1>
                <ResponsiveLine
                    data={g1data}
                    margin={{ top: 20, right: 50, bottom: 100, left: 50 }}
                    xScale={{ type: 'linear' }}
                    yScale={{ type: 'linear', stacked: true, min: 0, max: 100 }}
                    yFormat=" >-.2f"
                    curve="monotoneX"
                    axisTop={null}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        format: '.2s',
                        legend: 'Percent Composition',
                        legendOffset: -36,
                        legendPosition: 'middle'
                    }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        format: '.2f',
                        legend: 'Time',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    enableGridX={false}
                    colors={{ scheme: 'set1' }}
                    lineWidth={2}
                    pointSize={4}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    enableArea={true}
                    legends={[
                        {
                            anchor: 'bottom',
                            direction: 'column',
                            justify: false,
                            translateY: 100,
                            itemsSpacing: 2,
                            itemDirection: 'left-to-right',
                            itemWidth: 80,
                            itemHeight: 12,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: 'circle',
                            symbolBorderColor: 'rgba(0, 0, 0, .5)',
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemBackground: 'rgba(0, 0, 0, .03)',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            </div>
            <div className='h-[500px] flex flex-col items-center'>
                <h1 className="font-sans text-2xl font-light">Sequestration</h1>
                <ResponsiveLine
                    data={g2data}
                    margin={{ top: 20, right: 50, bottom: 100, left: 50 }}
                    xScale={{ type: 'linear' }}
                    yScale={{ type: 'linear' }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    axisTop={null}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        format: '.0s',
                        legend: 'Total CO2 Sequestration (Tons)',
                        legendOffset: -40,
                        legendPosition: 'middle'
                    }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        format: '.2f',
                        legend: 'Time',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    enableGridX={false}
                    colors={{ scheme: 'set2' }}
                    lineWidth={2}
                    pointSize={4}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                />
            </div>
            <div className='h-[500px] flex flex-col items-center'>
                <h1 className="font-sans text-2xl font-light">Elevation</h1>
                <ResponsiveLine
                    data={g3data}
                    margin={{ top: 20, right: 50, bottom: 100, left: 50 }}
                    xScale={{ type: 'linear' }}
                    yScale={{ type: 'linear' }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    axisTop={null}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        format: '.2f',
                        legend: 'Cumulative Elevation (inches)',
                        legendOffset: -45,
                        legendPosition: 'middle'
                    }}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        format: '.2f',
                        legend: 'Time',
                        legendOffset: 36,
                        legendPosition: 'middle'
                    }}
                    enableGridX={false}
                    colors={{ scheme: 'set1' }}
                    lineWidth={2}
                    pointSize={4}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                />
            </div>
        </div>
    </>
}

export default Dashboard