declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
  password: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface StationMetadataProps {
  stationId: string;
}

declare interface HourlyWeatherProps {
  stationId: string;
  start: string;
  end: string;
  timezone: string;
}

declare interface DailyWeatherProps {
  stationId: string;
  start: string;
  end: string;
  timezone: string;
}
