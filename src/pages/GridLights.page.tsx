import GridLights from '../components/GridLights/GridLights';

function GridLightsPage() {
  return (
    <GridLights
      shape={[
        [1, 1, 0],
        [1, 0, 1],
        [1, 0, 1],
      ]}
    />
  );
}

export default GridLightsPage;
