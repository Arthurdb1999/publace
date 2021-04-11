create database publace;
--ALTER DATABASE publace SET search_path=public,postgis;
--CREATE EXTENSION postgis;

create table usuario(
    id serial primary key not null,
    name varchar(144) not null,
    email varchar(144) not null,
    password varchar(144) not null
);

create table place(
    id serial primary key not null,
    name varchar(144) not null,
    descricao varchar(144),
    image varchar(144),
    geom geometry
);

create table relation(
    id serial primary key not null,
    name varchar(30)
);

create table place_usuario(
    id serial primary key not null,
	usuario_id integer,
	place_id integer,
	relation_id integer,
    foreign key (usuario_id) references usuario(id),
    foreign key (place_id) references place(id),
	foreign key (relation_id) references relation(id)
);

insert into relation values (DEFAULT, 'at');
insert into relation values (DEFAULT, 'maybe');
insert into relation values (DEFAULT, 'going');

insert into place values (DEFAULT, 'Praça Joca Neves', 'Praça top', 'joca-neves.png', ST_SetSRID(ST_MakePoint(-50.3350545, -27.81494), 4326));
insert into place values (DEFAULT, 'Parque Jonas Ramos', 'Tanque', 'tanque.jpg', ST_SetSRID(ST_MakePoint(-50.3223664, -27.8139213), 4326));
