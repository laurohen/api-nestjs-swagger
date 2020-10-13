import {
    BaseEntity,
    Entity,
    Unique,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';

  @Entity()
  export class Message extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 20 })
    titulo: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    descricao: string;

    @Column()
    imgUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

  }