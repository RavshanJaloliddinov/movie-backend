import { Repository } from "typeorm";
import { DeviceEntity } from "../entity";

export type DeviceRepository = Repository<DeviceEntity>