import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1716157861779 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        CREATE TABLE public.users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            phone VARCHAR(50),
            cpf VARCHAR(14) NOT NULL,
            address VARCHAR(255) NOT NULL,
            city VARCHAR(100) NOT NULL,
            state VARCHAR(50) NOT NULL,
            cep VARCHAR(20) NOT NULL,
            birthdate DATE NOT NULL,
            status BOOLEAN NOT NULL
        );

        CREATE SEQUENCE public.users_id_seq
        AS integer
        START WITH 1
        INCREMENT BY 1
        NO MINVALUE
        NO MAXVALUE
        CACHE 1;

        ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

        ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('users_id_seq'::regclass);
    `);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
        ALTER TABLE ONLY public.users ALTER COLUMN id DROP DEFAULT;

        DROP SEQUENCE public.users_id_seq;

        DROP TABLE users;
        `)
    }
}
