import { BaseEntity } from 'src/common/database/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('devices')
export class DeviceEntity extends BaseEntity {
  @Column({ name: 'device_id', type: 'varchar', unique: true, nullable: true })
  deviceId?: string;

  @Column({ name: 'ip_address', type: 'varchar', nullable: true })
  ipAddress?: string;

  @Column({ name: 'user_agent', type: 'varchar', nullable: true })
  userAgent?: string;

  @Column({ name: 'location', type: 'varchar', nullable: true })
  location?: string;

  @Column({ name: 'user_id', type: 'varchar', nullable: true })
  userId: string; 
}
