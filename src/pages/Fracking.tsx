import VFDController from "@/components/VFDController";
import AutopilotController from "@/components/AutopilotController";

const Home = () => {
  return (
    <>
      <section>
        <div className="flex flex-col gap-12">
          <AutopilotController />
          <VFDController
            name={`8" Pump`}
            pumpID="3_Progressive_Cavity_Pump"
            extraMeasurementName="Pressure"
            extraMeasurementUnits="psi"
            extraMeasurementValue={0}
          />
          <VFDController
            name="Water Pump"
            pumpID="4_Progressive_Cavity_Pump"
            extraMeasurementName="Mix Tank Level"
            extraMeasurementUnits="in"
            extraMeasurementValue={0}
          />
          <VFDController
            name="Pulp Pump"
            pumpID="Hydrapulper"
          />
          <VFDController
            name="Auger Truck"
            pumpID="Auger_Truck"
          />
        </div>
      </section>
    </>
  );
};

export default Home;
