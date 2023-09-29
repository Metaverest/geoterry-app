export interface IRealtimeLocation {
  latitude: number;
  longitude: number;
  altitude: number | null;
  heading: number | null;
  speed: number | null;
  latitudeDelta: number;
  longitudeDelta: number;
}
