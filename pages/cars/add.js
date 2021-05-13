import CarsBanner from "../../components/cars/cars-banner";
import Container from "../../components/shared/container";
import AddCar from "../../components/cars/add-car";

export default function Add() {
  return (
    <>
      <CarsBanner size="small"></CarsBanner>
      <Container>
        <AddCar />
      </Container>
    </>
  );
}
