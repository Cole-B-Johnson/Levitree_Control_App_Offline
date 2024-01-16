import VFDController from "@/components/VFDController"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import PressureGauges from "@/components/PressureGauges";

const Controls = () => {
  const [pressureData, setPressureData] = useState([0, 0, 0, 0, 0, 0])
  const [outputPressureData, setOutputPressureData] = useState(0)
  const [mixTankFillData, setMixTankFillData] = useState(0)

  const fetchOutputPressureData = async () => {
    try {
      const resp = await fetch('http://localhost:3001/default/get_pump_pressure')
      if (!resp.ok) {
        throw null
      }
      const data = await resp.json()
      setOutputPressureData(data)
    } catch (error) {
      toast.error(`Couldn't fetch current output pressure`)
    }
  }

  useEffect(() => {
    fetchOutputPressureData()
    const intervalId = setInterval(fetchOutputPressureData, 250)
    return () => clearInterval(intervalId)
  }, [])

  const fetchMixTankFillData = async () => {
    try {
      const resp = await fetch('http://localhost:3001/default/get_mix_tank_distance')
      if (!resp.ok) {
        throw null
      }
      const data = await resp.json()
      setMixTankFillData(data)
    } catch (error) {
      toast.error(`Couldn't fetch current mix tank fill level`)
    }
  }

  useEffect(() => {
    fetchMixTankFillData()
    const intervalId = setInterval(fetchMixTankFillData, 250)
    return () => clearInterval(intervalId)
  }, [])

  const fetchPressureData = async () => {
    try {
      const resp = await fetch('http://localhost:3001/default/get_pressure_data')
      if (!resp.ok) {
        throw null
      }
      const data = await resp.json()
      setPressureData(data)
    } catch (error) {
      toast.error(`Couldn't fetch current pressure sensor data`)
    }
  }

  useEffect(() => {
    fetchPressureData()
    const intervalId = setInterval(fetchPressureData, 250)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <section>
        <div className="flex flex-col gap-12">
          <VFDController
            name={`8" Pump`}
            pumpID="3_Progressive_Cavity_Pump"
            extraMeasurementName="Pressure"
            extraMeasurementUnits="psi"
            extraMeasurementValue={outputPressureData}
          />
          <VFDController
            name="Water Pump"
            pumpID="4_Progressive_Cavity_Pump"
            extraMeasurementName="Mix Tank Level"
            extraMeasurementUnits="in"
            extraMeasurementValue={mixTankFillData}
          />
          <VFDController
            name="Pulp Pump"
            pumpID="Hydrapulper"
          />
          <VFDController
            name="Auger Truck"
            pumpID="Auger_Truck"
          />
          <PressureGauges values={pressureData} />
        </div>
      </section>
    </>
  )
}

export default Controls
