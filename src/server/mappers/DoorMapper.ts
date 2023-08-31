import { Door } from '@/models/Door';
import { injectable } from 'tsyringe';
import { EntityMapper } from '@/server/lib/EntityMapper';
import { DoorDto } from '@/__mocks__/dtos/DoorDto';
import { BuildingDto } from '@/__mocks__/dtos/BuidlingDto';
import { ApartmentDto } from '@/__mocks__/dtos/ApartmentDto';

type BuildingDtosById = Record<string, BuildingDto>;
export type ApartmentDtosById = Record<string, ApartmentDto>;

@injectable()
export class DoorMapper implements EntityMapper<Door, DoorDto> {
  public toDomain(
    doorDto: DoorDto,
    buildingDtosById: BuildingDtosById,
    apartmentDtosById: ApartmentDtosById,
  ): Door {
    const buildingName = this.getBuildingName(
      buildingDtosById,
      doorDto.building_id,
    );
    const apartmentName = doorDto.apartment_id
      ? this.getApartmentName(apartmentDtosById, doorDto.apartment_id)
      : 'n/a';

    return {
      id: doorDto.id,
      name: doorDto.name,
      buildingName,
      connectionType: doorDto.connection_type,
      connectionStatus: doorDto.connection_status,
      lastConnectionStatusUpdate: doorDto.last_connection_status_update,
      apartmentName,
    };
  }

  private getBuildingName(buildingDtos: BuildingDtosById, id: string) {
    const building = buildingDtos[id];

    return building ? `${building.street} ${building.street_no}` : 'n/a';
  }

  private getApartmentName(apartmentDtos: ApartmentDtosById, id: string) {
    const apartment = apartmentDtos[id];

    return apartment ? `${apartment.name}` : 'n/a';
  }
}
